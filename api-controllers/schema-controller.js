const db = require('../db/models');

const getSchema = async (req, res) => {
  const { schemaId } = req.query;
  const schema = await db.Schema.findOne({ where: { id: schemaId } });
  if (schema) {
    return res.status(200).json(schema);
  }
  return res.status(200).json(schema);
};

const listSchemas = async (req, res) => {
  const schemas = await db.Schema.findAll();
  return res.status(200).json({ list: schemas });
};

const addSchema = async (req, res) => {
  const { body } = req;
  const schema = await db.Schema.create({ ...body });
  return res.status(201).json({ id: schema.id });
};

const updateSchema = async (req, res) => {
  const { body, query } = req;
  const { schemaId } = query;
  const updatedSchema = await db.Schema.update({ ...body }, { where: { id: schemaId } });

  if (updatedSchema[0]) {
    return res.status(200).json({ id: schemaId });
  }
  return res.status(200).json({ message: 'Schema not Found' });
};

const deleteSchema = async (req, res) => {
  const { schemaId } = req.query;
  const deletedSchema = await db.Schema.destroy({ where: { id: schemaId } });
  if (deletedSchema) {
    return res.status(200).json({ id: schemaId });
  }
  return res.status(400).json({ message: 'No Schema Found' });
};

module.exports = {
  getSchema,
  listSchemas,
  addSchema,
  updateSchema,
  deleteSchema,
};
