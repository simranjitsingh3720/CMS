// const { Sequelize } = require('sequelize');
const db = require('../../db/models');
const { MissingError } = require('../helpers/error-helper');

const getFormById = async (req, res) => {
  const { query } = req;
  const { formId, embed } = query;

  if (!formId) {
    throw new MissingError('Invalid form id');
  }
  try {
    const schema = await db.Schema.findOne({ where: { id: formId } });
    if (schema) {
      return res.status(200).json(schema);
    }
    throw new MissingError('No Form Found');
  } catch (error) {
    throw new MissingError('No Form Found');
  }
};

const addFormContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;

  let data = {};
  try {
    data = JSON.parse(body);
  } catch (e) {
    data = body;
  }
  console.log('data ', data);
  console.log('slug', schemaSlug);

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    const content = await db.Content.create({
      ...data,
      schemaId: schema.toJSON().id,
    });
    return res.status(201).json({ id: content.id });
  }
  throw new MissingError('Schema Not Found');
};

module.exports = {
  getFormById,
  addFormContent,
};
