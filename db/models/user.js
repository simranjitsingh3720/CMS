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
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.BIGINT(11) },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
      profile_completed: { type: DataTypes.BOOLEAN, defaultValue: false },
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
