const Sequelize = require('sequelize');
const config = require('../config');

const pageModel = require('./page');
const userModel = require('./user');
const assetModel = require('./asset');
const forgotModel = require('./forgotpassword');
const schemaModel = require('./schema');
const contentModel = require('./content');

const db = {};

const sequelize = new Sequelize(config);

const requireModel = (schema) => {
  const model = schema(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

requireModel(userModel);
requireModel(assetModel);
requireModel(pageModel);
requireModel(forgotModel);
requireModel(schemaModel);
requireModel(contentModel);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
