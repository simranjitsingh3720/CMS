const bcrypt = require('bcrypt');
const db = require('../db/models/index');

const signUp = async (req, res) => {
  const { body } = req;
  const {
    firstName, lastName, email, password,
  } = body;
  const userOk = 1;

  if (!firstName || !lastName || !email || !password) {
    res.send('empty fields are not allowed!!!');
  }
  const validateEmail = (e) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  };
  if (!validateEmail(email)) {
    res.send('Email format not correct');
  }
  const userFound = await db.User.findOne({ attributes: ['email'], where: { email } });
  if (userFound !== null) {
    res.send('User with this email already exists');
  }// res.send("User with this email do not exists");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userInfo = { ...body, password: hashedPassword };
  if (userOk) {
    await db.User.create(userInfo).then((user) => {
      res.send('User successfully inserted');
    }).catch((error) => {
      res.send('Some problem in inserting user');
    });
  } else {
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
