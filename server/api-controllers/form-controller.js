// const { Sequelize } = require('sequelize');
const db = require('../../db/models');
const { MissingError } = require('../helpers/error-helper');

const getFormById = async (req, res) => {
  const { query } = req;
  const { formId } = query;

  if (!formId) {
    throw new MissingError('form id invalid');
  }
  const schema = await db.Schema.findOne({ where: { id: formId } });
  if (schema) {
    return res.status(200).json(schema);
  }
  throw new MissingError('Form not found');
};

module.exports = {
  getFormById,
};
