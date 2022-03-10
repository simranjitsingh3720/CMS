const { Sequelize } = require('sequelize');
const db = require('../../db/models');

const getSchema = async (req, res) => {
  const { schemaSlug } = req.query;
  const schema = await db.Schema.findOne({ where: { id: schemaSlug } });
  if (schema) {
    return res.status(200).json(schema);
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const listSchemas = async (req, res) => {
  const { query } = req;
  const { q } = query;
  let schemas = [];

  if (q) {
    schemas = await db.Schema.findAll({
      where: {
        slug: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('slug')), 'LIKE', `%${q}%`),
      },
    });
  } else {
    schemas = await db.Schema.findAll({

    });
  }

  return res.status(200).json({ list: schemas });
};

const addSchema = async (req, res) => {
  const { body } = req;
  const schema = await db.Schema.create({ ...body });
  return res.status(201).json({ id: schema.id, slug: schema.slug });
};

const updateSchema = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  const updatedSchema = await db.Schema.update({ ...body }, { where: { slug: schemaSlug } });

  if (updatedSchema[0]) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const deleteSchema = async (req, res) => {
  const { schemaId } = req.query;
  const deletedSchema = await db.Schema.destroy({ where: { id: schemaId } });
  if (deletedSchema) {
    return res.status(200).json({ id: schemaId });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const getSchemaBySlug = async (req, res) => {
  const { schemaSlug } = req.query;
  const schema = await db.Schema.findOne({ where: { slug: schemaSlug } });
  if (schema) {
    return res.status(200).json(schema);
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const deleteSchemaBySlug = async (req, res) => {
  const { schemaSlug } = req.query;
  // check if data exits

  if (schemaSlug) {
    const contents = await db.Content.findAll({
      include: {
        model: db.Schema,
        attributes: ['id'],
        where: {
          slug: schemaSlug,
        },
      },
    });

    if (contents.length <= 0) {
      const deletedSchema = await db.Schema.destroy({ where: { slug: schemaSlug } });
      if (deletedSchema) {
        return res.status(200).json({ slug: schemaSlug });
      }
      return res.status(404).json({ message: 'Schema not found' });
    }
    return res.status(201).json({ message: 'There are some content for this schema. Cannot delete this ' });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const deleteFieldBySlug = async (req, res) => {
  const { fieldSlug } = req.query;
  await db.Schema.destroy({ where: { slug: fieldSlug } });

  return res.status(200).json({ slug: fieldSlug });
};

module.exports = {
  getSchema,
  getSchemaBySlug,
  listSchemas,
  addSchema,
  updateSchema,
  deleteSchema,
  deleteSchemaBySlug,
  deleteFieldBySlug,
};
