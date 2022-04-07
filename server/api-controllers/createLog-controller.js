const db = require('../../db/models');
const { ServerError } = require('../helpers/error-helper');

const createLog = async (actionName, performedBy, objectId, objectType) => {
  await db.Log.create({
    actionName,
    performedBy,
    objectId,
    objectType,
  });
};

// module.exports = { createLog };

const getLogs = async (req, res) => {
  try {
    const Logs = await db.Log.findAll({ order: [['updatedAt', 'DESC']], include: { model: db.User } });
    return res.status(200).json({ Logs });
  } catch (err) {
    throw new ServerError('Not able to connect with server');
  }
};

module.exports = { getLogs, createLog };
