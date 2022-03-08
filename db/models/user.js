const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.User.hasOne(models.User, { foreignKey: 'deletedBy' });
      models.User.belongsTo(models.Asset, { foreignKey: 'profilePicture', as: 'ProfilePicture' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      profilePicture: { type: DataTypes.UUID },
      flag: {
        type: DataTypes.JSON,
        defaultValue: {
          asset: true,
          page_manager: true,
          datastore: true,
          datastore_contents: true,
          datastore_structure: true,
        },
      },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
