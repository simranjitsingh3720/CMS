// eslint-disable-next-line import/no-import-module-exports
// const { addMinutes } = require('date-fns');

// const validator = require('validator');
const bcrypt = require('bcrypt');
// const { request } = require('express');
const randtoken = require('rand-token');
const { createLog } = require('./createLog-controller');

const db = require('../../db/models/index');
const { ValidityError, ServerError } = require('../helpers/error-helper');

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

// const signup = async (req, res) => {
//   const { body } = req;
//   const { firstName, lastName, email, password } = body;
//   if (!firstName || !lastName || !email || !password) {
//     let message = '';
//     if (!firstName) {
//       message += 'firstName is required';
//     } else if (!lastName) {
//       message += 'lastName is required';
//     } else if (!email) {
//       message += 'email is required';
//     } else if (!password) {
//       message += 'password  is required';
//     }

//     throw new ValidityError(message);
//   }
//   const isValidEmail = (/\S+@\S+\.\S+/).test(email);

//   if (!isValidEmail) {
//     throw new ValidityError('Invalid Email ID');
//   }

//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const userDetails = { ...body, password: hashedPassword };

//     const user = await db.User.create(userDetails);
//     req.session.user = user;
//     return res.status(200).json({ id: user.id, sessionId: req.session.id });
//   } catch (error) {
//     if (error.errors && error.errors[0].validatorKey === 'not_unique') {
//       throw new ValidityError('User email Exists');
//     }
//   }
// };

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

    const demoData = {
      userId: user.id,
    };
    let demo;
    try {
      demo = await db.UserDemoPreference.create(demoData);
    } catch (err) {
      console.log(err);
    }
    req.session.demoPreference = demo;
    req.session.user = user;
    createLog('SIGNUP', req.session.user.id, user.id, 'AUTH');
    return res.status(200).json({ id: user.id, sessionId: req.session.id });
  } catch (error) {
    if (error.errors && error.errors[0].validatorKey === 'not_unique') {
      throw new ValidityError('User email Exists');
    }
  }
  throw new ServerError('Server Error');
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

  let demo;
  try {
    demo = await db.UserDemoPreference.findOne({
      where: {
        userId: user.id,
      },
    });
  } catch (err) {
    console.log(err);
  }

  req.session.demoPreference = demo;
  req.session.user = user;
  if (remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
  }
  createLog('SIGNIN', req.session.user.id, user.id, 'AUTH');
  return res.status(200).json({ sessionId: req.session.id });
};

const signout = async (req, res) => {
  createLog('SIGNOUT', req.session.user.id, req.session.user.id, 'AUTH');
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
      const token = randtoken.generate(40);
      const values = {
        lastEmailSent: new Date(),
        emailToken: token,
      };
      await db.User.update(values, { where: { email } });
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
    const user = await db.User.findOne({ where: { emailToken: token } });
    if (user && user.emailToken) {
      const userReq = await db.User.findOne({ where: { id: user.id } });
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

  try {
    const user = await db.User.findOne({ where: { emailToken: token } });
    const emailSentDate = user.dataValues.lastEmailSent;
    const currentDate = new Date();
    let diff = (currentDate.getTime() - emailSentDate.getTime()) / 1000;
    diff /= 60;
    const tokenTime = Math.abs(Math.round(diff));

    const fixedTokenValidity = 5;
    if (tokenTime < fixedTokenValidity) {
      return res.status(200).json({ message: 'Show the form to change the password.' });
    }
    return res.status(500).json({ message: 'This password recovery link is expired' });
  } catch (error) {
    return res.status(500).json({ code: 'ServerError', message: 'This password recovery link is invalid' });
  }
};

module.exports = {
  signup, signin, signout, recoverPassword, changePassword, checkChangePasswordToken,
};
