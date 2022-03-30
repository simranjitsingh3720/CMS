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
      email: { type: DataTypes.STRING, require: true, allowNull: false, unique: true },
      countryCode: { type: DataTypes.STRING },
      mobileNumber: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, require: true, allowNull: false },
      firstName: { type: DataTypes.STRING, require: true, allowNull: false },
      lastName: { type: DataTypes.STRING, require: true, allowNull: false },
      profilePicture: { type: DataTypes.UUID },
      lastEmailSent: { type: DataTypes.DATE },
      emailToken: { type: DataTypes.STRING },
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
