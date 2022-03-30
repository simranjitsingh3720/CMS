import db from '../../db/models';

export const createLog = async (actionName, performedBy, objectId, objectType) => {
  await db.Log.create({
    actionName,
    performedBy,
    objectId,
    objectType,
  });
};
