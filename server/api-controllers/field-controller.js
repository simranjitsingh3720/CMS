const db = require('../../db/models');
const { ForbiddenError, MissingError, ServerError, ValidityError } = require('../helpers/error-helper');
const { createLog } = require('./createLog-controller');

const getSingleField = async (req, res) => {
  const { query } = req;
  const { schemaSlug, fieldId } = query;
  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });
  if (!data) {
    throw new MissingError('Table Not Found');
  }
  const singleField = await db.Field.findOne({ where: { fieldId, schemaSlug } });
  return res.status(200).json({ field: singleField });
};

const listAllFields = async (req, res) => {
  const { query } = req;
  const { schemaSlug } = query;
  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  const allFields = await db.Field.findAll({ where: { schemaSlug } });
  return res.status(200).json({ list: allFields });
};

const createField = async (req, res) => {
  const { body, query } = req;

  const { schemaSlug } = query;

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
    createLog('CREATE', req.session.user.id, field.id, 'FIELD');

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
    createLog('UPDATE', req.session.user.id, fieldId, 'FIELD');

    return res.status(200).json({ id: fieldId });
  }
  throw new MissingError('Schema not found');
};

const deleteField = async (req, res) => {
  const { query } = req;
  const { schemaSlug, fieldId } = query;

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

  try {
    const allContents = await db.ContentData.findAll({
      include: {
        model: db.Content,
        attributes: ['id'],
        where: {
          schemaSlug,
        },
      },
      where: {
        attributeKey: fieldId,
      },
    });

    if (allContents.length === 0) {
      const deletedField = await db.Field.destroy({ where: { schemaSlug, fieldId } });
      if (deletedField) {
        createLog('DELETE', req.session.user.id, fieldId, 'FIELD');

        return res.status(200).json({ id: fieldId });
      }
    }
    throw new ForbiddenError('There are some content for this field. Not allowed to delete. First delete all the content');
  } catch (error) {
    throw new ForbiddenError('There are some content for this field. Not allowed to delete. First delete all the content');
  }
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

module.exports = {
  updateField,
  deleteField,
  createField,
  reOrderFields,
  listAllFields,
  getSingleField,
};
