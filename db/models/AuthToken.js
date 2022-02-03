// module.exports = (sequelize, DataTypes) => {
  const {Sequelize,DataTypes} = require('sequelize');
  const sequelize = new Sequelize('mysql::memory:');
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = function({ User }) {
    AuthToken.belongsTo(User);
  };

  // generates a random 15 character token and
  // associates it with a user
  export const AuthGen = () =>{
    AuthToken.generate = async function(UserId) {
      if (!UserId) {
        throw new Error('AuthToken requires a user ID')
      }
  
      let token = '';
  
      const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';
  
      for (var i = 0; i < 15; i++) {
        token += possibleCharacters.charAt(
          Math.floor(Math.random() * possibleCharacters.length)
        );
      }
  
      return AuthToken.create({ token, UserId })
    }
  }
  

  // return AuthToken;
// };
// module.exports = {AuthGen};