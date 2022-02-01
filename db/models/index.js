const Sequelize = require("sequelize");

const config = require("../config");
const userModel = require("./user");
const contentModel = require("./content");
const schemaModel = require("./schema");

const db = {};
const sequelize = new Sequelize(config);

const requireModel = (schema) => {
  const model = schema(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};
requireModel(userModel);
requireModel(contentModel);
requireModel(schemaModel);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log("DBBBBB ", db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
