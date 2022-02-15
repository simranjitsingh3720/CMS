const { Op } = require('sequelize');

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

module.exports = { listUser };
