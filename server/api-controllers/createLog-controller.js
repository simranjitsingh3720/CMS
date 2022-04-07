const db = require('../../db/models');

const createLog = async (actionName, performedBy, objectId, objectType) => {
  await db.Log.create({
    actionName,
    performedBy,
    objectId,
    objectType,
  });
};

module.exports = { createLog };
