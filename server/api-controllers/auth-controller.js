const bcrypt = require('bcrypt');
const db = require('../../db/models/index');

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

module.exports = { signup, signin };
