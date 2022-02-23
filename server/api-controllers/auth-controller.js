import { addMinutes } from 'date-fns';
import { DATE } from 'sequelize';

const { message } = require('antd');
const { MigrationHubStrategy } = require('aws-sdk');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randtoken = require('rand-token');
const Sequelize = require('sequelize');
const mailjet = require('node-mailjet').connect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_PRIVATE_KEY);
const db = require('../../db/models/index');
const config = require('../../db/config');

const sequelize = new Sequelize(config);

function sendEmail(recipient, name, link) {
  return mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'akshatbhutra007@gmail.com',
            Name: 'COGOPORT-CMS',
          },
          To: [
            {
              Email: recipient,
            },
          ],
          Subject: 'Cogoport CMS - Password Recovery',
          TextPart: `Hello, ${name}. \n To change the password click ${link}. \n The Cogoport Team`,
          // HTMLPart: 'Hello, ${name}. \n To change the password click ${link}. \n The Cogoport Team',
        },
      ],
    })
    .then((result) => {
      // do something with the send result or ignore
      console.log('success ', result);
    })
    .catch((err) => {
      // handle an error
      console.log('error ', err);
    });
}
// function post(request, response) {
//   const i18n = require(`../i18n/${request.body.locale || 'en'}`);
//   const send = mailjet.post('send');
//   const requestObject = {
//     Messages: [{
//       From: {
//         Email: 'hello@allma.si',
//         Name: 'Ferenc Almasi',
//       },
//       To: [{
//         Email: request.body.email,
//       }],
//       Subject: i18n.passwordResetMailSubject,
//       HTMLPart: passwordResetTemplate(i18n),
//     }],
//   };
//   send.request(requestObject).then(() => {
//     response.json({
//       success: true,
//     });
//   }).catch((err) => {
//     console.log(err);

//     response.json({
//       error: err.statusCode,
//     });
//   });
// }

const signup = async (req, res) => {
  const { body } = req;
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Empty Fields are not allowed' });
  }
  const isValidEmail = (/\S+@\S+\.\S+/).test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'Email format not correct' });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const userDetails = { ...body, password: hashedPassword };
  try {
    const user = await db.User.create(userDetails);
    req.session.user = user;
    return res.status(200).json({ id: user.id, sessionId: req.session.id });
  } catch (err) {
    return res.status(400).json({ message: 'Some problem in inserting user' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Requested email or password is missing' });
  }
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Email does not exist' });
  }
  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) {
    return res.status(400).json({ message: 'Password is incorrect' });
  }
  req.session.user = user;
  return res.status(200).json({ sessionId: req.session.id });
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user) {
    const fp = await db.ForgotPassword.findOne({ where: { user: user.id, isEarlier: false } });
    if (fp) {
      fp.isEarlier = true;
      await fp.save();
    }
    const values = {
      user: user.id,
      expiresAt: addMinutes(new Date(), 50),
      isEarlier: false,
      isUsed: false,
    };
    const ret = await db.ForgotPassword.create(values);
    const name = `${user.firstName} ${user.lastName}`;
    const link = `localhost:8000/passwordChange/${ret.id}`;
    sendEmail(email, name, link);
    return res.status(200).send({ message: 'updated database' });
  }
  return res.status(400).send({ message: 'Email not found in database' });
};

const changePassword = async (req, res) => {
  const { password, token } = req.body;
  console.log('ppp ', password, token);
  const user = await db.ForgotPassword.findOne({ where: { id: token } });
  if (user) {
    const userReq = await db.User.findOne({ where: { id: user.user } });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    userReq.password = hashedPassword;
    await userReq.save();
    req.session.user = userReq;
    user.isUsed = true;
    await user.save();
    return res.status(200).send({ message: 'Password updated' });
  }
  return res.status(400).send({ message: 'Invalid token found in url' });
};

const handleToken = async (req, res) => {
  const { token } = req.body;
  const user = await db.ForgotPassword.findOne({ where: { id: token } });
  if (!user) {
    return res.status(400).json({ message: 'This password recovery link was not found.' });
  }
  if (user.expiresAt <= addMinutes(new Date(), 0)) {
    return res.status(400).json({ message: 'This password recovery link was expired.' });
  }
  if (user.isEarlier === true) {
    return res.status(400).json({ message: 'This password recovery link has been rejected because another link was sent.' });
  }
  if (user.isUsed === true) {
    return res.status(400).json({ message: 'This password recovery link has been already used.' });
  }
  return res.status(200).json({ message: 'Show the form to change the password.' });
};

module.exports = { signup, signin, recoverPassword, changePassword, handleToken };
