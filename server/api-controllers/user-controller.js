const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../../db/models/index');

const listUser = async (req, res) => {
  const { query } = req;
  const { q } = query;
  const users = await db.User.findAll({
    where: {
      [Op.or]: {
        firstName: { [Op.substring]: q },
        lastName: { [Op.substring]: q },
      },
    },
  });
  return res.status(200).json({ list: users });
};

const getMe = async (req, res) => {
  const { session, sessionID } = req;
  if (!session.user) {
    return res.status(401).json({ message: 'No session exists' });
  }
  return res.status(200).json({ sessionId: sessionID, user: session.user });
};

const updateUser = async (req, res) => {
  const { userId } = req.query;
  const data = req.body;
  if (!(req.session.user.id === userId)) {
    res.status(400).json({ message: 'user not signed in' });
  }
  const updatedUser = await db.User.update({ ...data }, { where: { id: userId } });
  const getUser = await db.User.findOne({ where: { id: userId } });
  req.session.user = getUser.toJSON();
  res.status(200).json({ id: updatedUser.id });
};

const findUser = async (req, res) => {
  const { userId } = req.query;

  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send({ message: 'no user found' });
  }
  return res.status(200).json({ user });
};

const changePassword = async (req, res) => {
  const { id, password } = req.session.user;
  const { currentPassword, newPassword } = req.body;
  const isPasswordSame = await bcrypt.compare(currentPassword, password);
  if (!isPasswordSame) {
    return res.status(400).json({ message: 'Old Password is incorrect' });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword2 = await bcrypt.hash(newPassword, salt);
  const user = await db.User.update({ password: hashedPassword2 }, { where: { id } });
  const getUser = await db.User.findOne({ where: { id } });
  req.session.user = getUser.toJSON();
  return res.status(200).json({ id: user.id });
};

module.exports = { listUser, getMe, updateUser, findUser, changePassword };
