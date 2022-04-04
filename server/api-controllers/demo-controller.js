import { ServerError } from '../helpers/error-helper';
import { createLog } from './createLog-controller';

const db = require('../../db/models');

export const updateUser = async (req, res) => {
  const { userId } = req.query;
  try {
    await db.UserDemoPreference.update({ ...req.body }, { where: { userId } });
    await db.UserDemoPreference.findOne({ where: { userId } });
    createLog('CREATE', req.session.user.id, userId, 'USER DEMO PREFERENCES');
    return res.status(200).json({ userId });
  } catch (err) {
    throw new ServerError('There was an error updating the user');
  }
};
