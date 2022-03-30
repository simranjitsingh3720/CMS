const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      models.Log.belongsTo(models.User, { foreignKey: 'performedBy' });
    }
  }

  Log.init(
    {
      id: { type: DataTypes.UUIDV4, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      actionName: { type: DataTypes.STRING },
      performedBy: { type: DataTypes.UUID },
      objectId: { type: DataTypes.UUID },
      objectType: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      // paranoid: true,
      modelName: 'Log',
      tableName: 'Logs',
    },
  );

  return Log;
};
