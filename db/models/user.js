const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Content, { foreignKey: "createdBy" });
      models.User.hasMany(models.Schema, { foreignKey: "createdBy" });
      models.User.hasMany(models.Page, { foreignKey: "createdBy" });
    }
  }

  User.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true,allowNull: false, defaultValue: DataTypes.UUIDV4, },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      profilePicture: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE }
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
