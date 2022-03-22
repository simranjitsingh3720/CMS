// eslint-disable-next-line import/no-import-module-exports
const { addMinutes } = require('date-fns');

const validator = require('validator');
const bcrypt = require('bcrypt');
const db = require('../../db/models/index');
const { ValidityError } = require('../helpers/error-helper');

// const mailjet = require('node-mailjet')
//   .connect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_PRIVATE_KEY);

// function sendEmail(recipient, name, link) {
//   return mailjet
//     .post('send', { version: 'v3.1' })
//     .request({
//       Messages: [
//         {
//           From: {
//             Email: 'akshatbhutra007@gmail.com',
//             Name: 'COGOPORT-CMS',
//           },
//           To: [
//             {
//               Email: recipient,
//             },
//           ],
//           Subject: 'Cogoport CMS - Password Recovery',
//           HTMLPart: `<h2>Hello, ${name}. <br /> To change the password click <a href=${link} >link</a>. <br />  The Cogoport Team</h2>`,
//         },
//       ],
//     })
//     .then((result) => {
//       // do something with the send result or ignore
//       console.log('success ', result);
//     })
//     .catch((err) => {
//       // handle an error
//       console.log('error ', err);
//     });
// }

const signup = async (req, res) => {
  const { body } = req;
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName || !email || !password) {
    let message = '';
    if (!firstName) {
      message += 'firstName is required';
    } else if (!lastName) {
      message += 'lastName is required';
    } else if (!email) {
      message += 'email is required';
    } else if (!password) {
      message += 'password  is required';
    }

    throw new ValidityError(message);
  }
  const isValidEmail = (/\S+@\S+\.\S+/).test(email);

  if (!isValidEmail) {
    throw new ValidityError('Invalid Email ID');
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userDetails = { ...body, password: hashedPassword };

    const user = await db.User.create(userDetails);
    req.session.user = user;
    return res.status(200).json({ id: user.id, sessionId: req.session.id });
  } catch (error) {
    if (error.errors && error.errors[0].validatorKey === 'not_unique') {
      throw new ValidityError('User email Exists');
    }
  }
};

const signin = async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    let message = '';

    if (!email) {
      message += 'email is required';
    } else if (!password) {
      message += 'password is required';
    }
    throw new ValidityError(message);
  }

  const user = await db.User.findOne({ where: { email }, include: { model: db.Asset, as: 'ProfilePicture' } });
  if (!user) {
    throw new ValidityError('Email or password is incorrect');
  }

  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) {
    throw new ValidityError('Email or password is incorrect');
  }

  req.session.user = user;
  if (remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
  }

  return res.status(200).json({ sessionId: req.session.id });
};

const signout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: 'Logged Out Successfully' });
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ValidityError('Email required for recovery');
  }

  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      const fp = await db.ForgotPassword.findOne({ where: { user: user.id, isValid: true } });
      if (fp) {
        fp.isValid = false;
        await fp.save();
      }
      const values = {
        user: user.id,
        expiresAt: addMinutes(new Date(), 100),
        isValid: true,
      };
      await db.ForgotPassword.create(values);
      // const name = `${user.firstName} ${user.lastName}`;
      // sendEmail(email, name, link);
      return res.status(200).json({ message: 'Password recovered successfully' });
    }
    throw new ValidityError('Email does not exists');
  } catch (error) {
    throw new ValidityError('Email does not exists');
  }
};

const changePassword = async (req, res) => {
  const { password, token } = req.body;

  if (!password) {
    return res.status(400).json({ code: 'ValidationError', message: 'Password required' });
  }

  if (!token) {
    return res.status(400).json({ code: 'ValidationError', message: 'Link is invalid' });
  }

  try {
    const user = await db.ForgotPassword.findOne({ where: { id: token } });
    if (user && user.isValid && user.expiresAt > addMinutes(new Date(), 0)) {
      const userReq = await db.User.findOne({ where: { id: user.user } });
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      userReq.password = hashedPassword;
      await userReq.save();
      user.isValid = false;
      await user.save();
      return res.status(200).json({ message: 'Password updated' });
    }
    return res.status(400).json({ code: 'ValidationError', message: 'Password not updated. Try again' });
  } catch (error) {
    return res.status(500).json({ code: 'ServerError', message: 'Server error.' });
  }
};

const checkChangePasswordToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ code: 'ValidationError', message: 'Invalid Link' });
  }

  if (!validator.isUUID(token)) {
    return res.status(400).json({ code: 'ValidationError', message: 'This password recovery link is invalid.' });
  }

  try {
    const user = await db.ForgotPassword.findOne({ where: { id: token } });
    if (!user || !user.isValid) {
      return res.status(400).json({ message: 'This password recovery link is invalid.' });
    }
    return res.status(200).json({ message: 'Show the form to change the password.' });
  } catch (error) {
    return res.status(500).json({ code: 'ServerError', message: 'Server error.' });
  }
};

module.exports = {
  signup, signin, signout, recoverPassword, changePassword, checkChangePasswordToken,
};
