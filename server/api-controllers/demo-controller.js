import { DuplicateError, MissingError, ValidityError } from '../helpers/error-helper';

const { Op, Sequelize } = require('sequelize');
const db = require('../../db/models');

export const updateUser = async (req, res) => {
  const { userId } = req.query;
  console.log('userid', req.body);
  try {
    await db.UserDemoPreference.update({ ...req.body }, { where: { userId } });
    await db.UserDemoPreference.findOne({ where: { userId } });

    // req.session.demo=

    return res.status(200).json({ userId });
  } catch (err) {
    return res.status(400).json({ message: 'There was an error updating the user' });
  }
};
