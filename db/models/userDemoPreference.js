const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDemoPreference extends Model {
    static associate(models) {
      models.UserDemoPreference.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserDemoPreference.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.UUID },
    asset: { type: DataTypes.BOOLEAN, defaultValue: true },
    pageManager: { type: DataTypes.BOOLEAN, defaultValue: true },
    datastore: { type: DataTypes.BOOLEAN, defaultValue: true },
    datastoreContents: { type: DataTypes.BOOLEAN, defaultValue: true },
    datastoreStructure: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'UserDemoPreference',
    tableName: 'UserDemoPreferences',
  });
  return UserDemoPreference;
};
