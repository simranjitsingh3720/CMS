const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Content, { foreignKey: "createdBy" });
      models.User.hasMany(models.Schema, { foreignKey: "createdBy" });
    }
  }

  User.init(
    {
      id: { type: DataTypes.UUID,primaryKey: true,allowNull: false,defaultValue: DataTypes.UUIDV4, },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },

      profilePicture: { type: DataTypes.STRING },
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
