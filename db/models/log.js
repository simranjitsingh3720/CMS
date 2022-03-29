const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      models.Content.belongsTo(models.User, { foreignKey: 'performedBy' });
    }
  }
  // ["CREATE","UPDATE","READ","DELETE", "SENTEMAIL","FORGOTPASSWORD","LOGIN","SIGNUP","SIGNUPFAIL","LOGINFAIL"]

  Log.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      actionName: { type: DataTypes.STRING },
      performedBy: { type: DataTypes.STRING },
      objectId: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Log',
      tableName: 'Logs',
    },
  );

  return Log;
};
