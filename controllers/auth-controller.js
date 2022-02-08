const bcrypt = require('bcrypt');
const db = require('../db/models/index');

const signUp = async (req, res) => {
  const {
    body,
  } = req;
  const {
    firstName,
    lastName,
    email,
    password,
  } = body;
  const userOk = 1;
  let hashedPassword;
  if (!firstName || !lastName || !email || !password) {
    // res.status(422).send('Empty Fields are not allowed!!!!');
    res.status(400).json({
      message: 'Empty Fields are not allowed!!!!',
	  });
  }
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  if (!validateEmail(email)) {
    res.status(422).json({ message: 'Email format not correct' });
  }
  let userFound;
  userFound = await db.User.findOne({
    attributes: ['email'],
    where: {
      email,
    },
  });
  if (userFound !== null) {
    res.status(422).json({ message: 'User with this email already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  const userInfo = {
    ...body,
    password: hashedPassword,
  };
  if (userOk) {
    await db.User.create(userInfo).then((user) => {
      req.session.user = user;
      return res.status(200).json({
        sessionId: req.session.id,
      });
    }).catch((error) => {
      res.status(422).json({ message: 'Some problem in inserting user' });
      	// res.send('Some problem in inserting user');
    });
  } else {
    res.status(422).json({ message: 'User not allowed' });
    res.send('User not allowed');
  }
};

// signin route
// 1. in the request we will send user information.
// 2. then we have to validate if user already exists or not.
// 3. if  exists, then redirect him to dashboard.
// 4. if not exists then prompt("not exists")
// 5. maintaing session also with help of express-session and print the token (POSTMAN).
// const bcrypt = require('bcrypt');

const signin = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).send({ message: 'requested email or password is missing' });
  }

  const user = await db.User.findOne({ where: { email } });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      req.session.user = user;
      return res.status(200).json({ sessionId: req.session.id });
    }
    return res.status(400).json({ message: 'Password is incorrect' });
  }
  return res.status(400).json({ message: 'Email does not exist' });
};

module.exports = {
  signUp,
  signin,
};
