const db = require('../../db/models');
const { ServerError } = require('../helpers/error-helper');

const getAllRecords = async (req, res) => {
  let assets = [];
  let pages = [];
  let schemas = [];
  let field = [];
  let users = [];
  try {
    assets = await db.Asset.findAll();
    schemas = await db.Schema.findAll();
    pages = await db.Page.findAll();
    users = await db.User.findAll();
    field = await db.Field.findAll();
    const data = {
      pages,
      schemas,
      assets,
      users,
      field,
    };
    return res.status(200).json({ data });
  } catch (err) {
    throw new ServerError('Not able to connect with server');
  }
};

module.exports = { getAllRecords };
