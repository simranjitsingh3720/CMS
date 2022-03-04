const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../../db/models/index');

const listUser = async (req, res) => {
  const { query } = req;
  const { q } = query;
  const users = await db.User.findAll({
    where: {
      [Op.or]: {
        firstName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('firstName')), 'LIKE', `%${q}%`),
        lastName: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('lastName')), 'LIKE', `%${q}%`),
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
  try {
    await db.User.update({ ...req.body }, { where: { id: userId } });
    if (req.session.user && req.session.user.id === userId) {
      const updatedUser = await db.User.findOne({ where: { id: userId }, include: { model: db.Asset, as: 'ProfilePicture' } });
      req.session.user = updatedUser.toJSON();
    }
    return res.status(200).json({ id: userId });
  } catch (err) {
    return res.status(400).json({ message: 'There was an error updaing the user' });
  }
};

const findUser = async (req, res) => {
  const { userId } = req.query;

  const user = await db.User.findOne({ where: { id: userId }, include: { model: db.Asset, as: 'ProfilePicture' } });
  if (!user) {
    return res.status(404).send({ message: 'no user found' });
  }
  return res.status(200).json({ user });
};

const changePassword = async (req, res) => {
  const { id, password } = req.session.user;
  const { currentPassword, newPassword } = req.body;
  try {
    const isPasswordSame = await bcrypt.compare(currentPassword, password);
    if (!isPasswordSame) {
      return res.status(400).json({ message: 'Old Password is incorrect' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword2 = await bcrypt.hash(newPassword, salt);
    await db.User.update({ password: hashedPassword2 }, { where: { id } });
    const updatedUser = await db.User.findOne({ where: { id }, include: { model: db.Asset, as: 'ProfilePicture' } });
    req.session.user = updatedUser.toJSON();
    return res.status(200).json({ id });
  } catch (err) {
    return res.status(400).json({ message: 'There was an error updaing the password' });
  }
};

module.exports = { listUser, getMe, updateUser, findUser, changePassword };
