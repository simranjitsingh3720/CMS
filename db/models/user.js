const { Model } = require('sequelize');
// const bcrypt = require('bcrypt');
// const {AuthGen} = require('./AuthToken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.Schema.hasMany(models.Content, { foreignKey: 'createdBy' });
      models.User.hasMany(models.Schema, { foreignKey: 'createdBy' });
      models.User.hasMany(models.Page, { foreignKey: 'createdBy' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      profilePicture: { type: DataTypes.STRING },
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
      tableName: 'users',
    },
  );
  return User;
};
