// const { Sequelize } = require('sequelize');
const db = require('../../db/models');
const { ServerError } = require('../helpers/error-helper');

const getAllRecords = async (req, res) => {
  let assets = [];
  let pages = [];
  let schemas = [];
  let users = [];
  try {
    assets = await db.Asset.findAll();
    schemas = await db.Schema.findAll();
    pages = await db.Page.findAll();
    users = await db.User.findAll();
    const data = {
      pages,
      schemas,
      assets,
      users,
    };
    return res.status(200).json({ data });
  } catch (err) {
    throw new ServerError('Not able to connect with server');
  }
};

module.exports = { getAllRecords };
