const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
//const {AuthGen} = require('./AuthToken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Content, { foreignKey: "createdBy" });
      models.User.hasMany(models.Schema, { foreignKey: "createdBy" });
    }
  }
  
  
  // User.prototype.authorize = async function () {
  //   const { AuthToken } = sequelize.models;
  //   const user = this

  //   // create a new auth token associated to 'this' user
  //   // by calling the AuthToken class method we created earlier
  //   // and passing it the user id
  //   //const authToken = await AuthGen(this.id);

  //   // addAuthToken is a generated method provided by
  //   // sequelize which is made for any 'hasMany' relationships
  //   //await user.addAuthToken(authToken);

  //   return { user };//, authToken };
  // };

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
