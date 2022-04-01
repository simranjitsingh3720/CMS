const db = require('../../db/models');
const { ValidityError, MissingError, ServerError } = require('../helpers/error-helper');

const createField = async (req, res) => {
  const { body, query } = req;

  const { schemaId, schemaSlug } = query;

  // if (!fieldId || !schema) {
  //   let message = '';

  //   if (!fieldId) {
  //     message += 'fieldID required';
  //   } else if (!schema) {
  //     message += 'fields details required';
  //   }

  //   throw new ValidityError(message);
  // }

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const isFieldIdExist = await db.Field.findOne({
    where: {
      schemaSlug,
      fieldId: body.fieldId,
    },
  });

  if (isFieldIdExist) {
    throw new MissingError('Field Id already exists.');
  }

  const field = await db.Field.create({
    ...body,
    schemaId: data.id,
    schemaSlug,
  });

  if (field) {
    return res.status(201).json({ id: field.id });
  }

  throw new MissingError('Schema not found');
};

const updateField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, fieldId } = query;

  if (!body) {
    throw ValidityError('Data for update required');
  }

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const updatedField = await db.Field.update({ ...body }, { where: { schemaSlug, fieldId } });

  if (updatedField) {
    return res.status(200).json({ id: fieldId });
  }
  throw new MissingError('Schema not found');
};

const deleteField = async (req, res) => {
  const { query } = req;
  const { schemaId, schemaSlug, fieldId } = query;

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const deletedField = await db.Field.destroy({ where: { schemaSlug, fieldId } });

  if (deletedField) {
    return res.status(200).json({ id: fieldId });
  }
  throw new ServerError('Not able to connect with Server');
};

const reOrderFields = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  const { schema } = body;

  const updatedSchema = await db.Schema.update({ schema }, { where: { slug: schemaSlug } });

  if (updatedSchema) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};

const listAllFields = async (req, res) => {
  const { body, query } = req;
  const { schemaId, schemaSlug, fieldId } = query;

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const allFields = await db.Field.findAll({ where: { schemaSlug } });
  return res.status(200).json({ list: allFields });
};
const getSingleField = async (req, res) => {
  const { body, query } = req;
  const { schemaId, schemaSlug, fieldId } = query;
  console.log(schemaId);
  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });
  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const singleField = await db.Field.findOne({ where: { fieldId, schemaSlug } });
  return res.status(200).json({ field: singleField });
};
module.exports = {
  updateField,
  deleteField,
  createField,
  reOrderFields,
  listAllFields,
  getSingleField,
};
