const { Op } = require('sequelize');
const db = require('../../db/models');

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

module.exports = { listUser, getMe };
