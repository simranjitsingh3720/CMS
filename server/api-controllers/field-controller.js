const db = require('../../db/models');

const createField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });
  const { schema, fieldId } = body;
  let newSchema = data.toJSON().schema || [];
  let i = 0;
  let flag = false;
  for (i = 0; i < newSchema.length; i += 1) {
    if (newSchema[i].id === fieldId) {
      flag = true;
      break;
    }
  }
  if (flag) {
    return res.status(200).json({ message: 'A field with this ID already exists.' });
  }
  newSchema.splice(newSchema.length, 0, schema);
  newSchema = { ...data, schema: [...newSchema] };

  const updateField = await db.Schema.update({ ...newSchema }, { where: { slug: schemaSlug } });

  if (updateField) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const updateField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, fieldId } = query;

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  let newSchema = data.toJSON().schema;

  let i = 0;
  for (i = 0; i < newSchema.length; i += 1) {
    if (newSchema[i].id === fieldId) {
      newSchema[i] = body.schema;
      break;
    }
  }

  newSchema = { ...data, schema: [...newSchema] };

  const updatedSchema = await db.Schema.update({ ...newSchema }, { where: { slug: schemaSlug } });

  if (updatedSchema) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const deleteField = async (req, res) => {
  const { query } = req;
  const { schemaSlug, fieldId } = query;
  const contents = await db.Content.findAll({
    include: {
      model: db.Schema,
      attributes: ['id', 'schema'],
      where: {
        slug: schemaSlug,
      },
    },
  });
  if (contents[0]) {
    contents.forEach((content) => {
      const { data } = content.dataValues;
      if (data[fieldId]) {
        return res.status(200).json({ message: 'Some contents exists for the respective field. Please delete the contents first to delete this field.' });
      }
    });
  }

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });
  const newSchema = data.toJSON().schema;
  let i = 0;
  for (i = 0; i < newSchema.length; i += 1) {
    if (newSchema[i].id === fieldId) {
      newSchema.splice(i, 1);
      break;
    }
  }
  const updatedSchema = await db.Schema.update(
    { schema: newSchema },
    { where: { slug: schemaSlug } },
  );

  if (updatedSchema) {
    return res.status(200).json({ id: 'contents' });
  }
  return res.status(404).json({ message: 'contents' });
};

module.exports = {
  updateField,
  deleteField,
  createField,
};
