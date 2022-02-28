const db = require('../../db/models');

const createField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;

  const updateField = await db.Schema.update({ ...body }, { where: { slug: schemaSlug } });

  if (updateField) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema -//----> not found' });
};

const updateField = async (req, res) => {
  const { body, query } = req;
  // console.log('req ', body, query);
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
  // console.log('dfgyvrvbrkjvbr', newSchema);

  const updatedSchema = await db.Schema.update({ ...newSchema }, { where: { slug: schemaSlug } });

  if (updatedSchema) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const deleteField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, fieldId } = query;
  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });
  let newSchema = data.toJSON().schema;
  for (let i = 0; i < newSchema.length; i += 1) {
    if (newSchema[i].id === fieldId) {
      newSchema.splice(i, 1);
      break;
    }
  }

  // console.log(newSchema);
  // const filtered = newSchema.filter((el) => el.id !== body.fieldId);
  newSchema = { ...data, schema: [...newSchema] };

  const updatedSchema = await db.Schema.update({ ...newSchema }, { where: { slug: schemaSlug } });

  console.log(updatedSchema);

  if (updatedSchema) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema ?????not found' });
};

module.exports = {
  updateField,
  deleteField,
  createField,
};
