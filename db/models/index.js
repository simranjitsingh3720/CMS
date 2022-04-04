const Sequelize = require('sequelize');
const config = require('../config');
const pageModel = require('./page');
const userModel = require('./user');
const assetModel = require('./asset');
const schemaModel = require('./schema');
const contentModel = require('./content');
const userDemoPreferenceModel = require('./userDemoPreference');
const fieldModel = require('./field');
const logModel = require('./log');
const contentDataModel = require('./contentData');

const db = {};

const sequelize = new Sequelize(config);

const requireModel = (schema) => {
  const model = schema(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

requireModel(userModel);
requireModel(assetModel);
requireModel(pageModel);
requireModel(schemaModel);
requireModel(contentModel);
requireModel(userDemoPreferenceModel);
requireModel(fieldModel);
requireModel(logModel);
requireModel(contentDataModel);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
