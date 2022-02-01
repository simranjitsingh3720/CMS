require("dotenv").config();
const db = require("../../db/models/index");
db.sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log("error ", err);
  });

module.exports = db.sequelize;
