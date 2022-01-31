require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../../db/config");
const sequelize = new Sequelize(config);

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log("error ", err);
  });

module.exports = sequelize;
