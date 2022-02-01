require("dotenv").config();
const db = require("../../db/models/index");

const authenticate=async()=>{
  await db.sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log("error ", err);
  });
};

authenticate();

module.exports = db.sequelize;