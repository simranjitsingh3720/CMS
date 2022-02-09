const bcrypt = require('bcrypt');
const db = require('../db/models/index');

const signup = async (req, res) => {
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
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: 'Empty Fields are not allowed!!!!',
    });
  }
  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email format not correct' });
  }
  const userFound = await db.User.findOne({
    attributes: ['email'],
    where: {
      email,
    },
  });
  if (userFound !== null) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
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
    }).catch(() => res.status(400).json({ message: 'Some problem in inserting user' }));
  } else {
    return res.status(400).json({ message: 'User not allowed' });
  }
  return null;
};

const signin = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Requested email or password is missing' });
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
  signup,
  signin,
};
