const db = require('../../db/models');
const { ValidityError, MissingError, DuplicateError, ServerError, ForbiddenError } = require('../helpers/error-helper');

const createField = async (req, res) => {
  const { body, query } = req;
  const { schema, fieldId } = body;
  const { schemaSlug } = query;

  if (!fieldId || !schema) {
    let message = '';

    if (!fieldId) {
      message += 'fieldID required';
    } else if (!schema) {
      message += 'fields details required';
    }

    throw new ValidityError(message);
  }

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

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
    throw new DuplicateError('A field with this ID already exists.');
  }
  newSchema.splice(newSchema.length, 0, schema);
  newSchema = { ...data, schema: [...newSchema] };

  const updateField = await db.Schema.update({ ...newSchema }, { where: { slug: schemaSlug } });

  if (updateField) {
    return res.status(200).json({ id: fieldId });
  }
  throw new MissingError('Schema not found');
};

const updateField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, fieldId } = query;

  if (!body.schema) {
    throw ValidityError('Data for update required');
  }

  const data = await db.Schema.findOne({ where: { slug: schemaSlug } });

  if (!data) {
    throw new MissingError('Table Not Found');
  }

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
  throw new MissingError('Schema not found');
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

  if (contents && contents.length > 0) {
    let isData = false;
    contents.forEach((content) => {
      const { data } = content.dataValues;
      if (data[fieldId]) {
        isData = true;
      }
    });

    if (isData) {
      throw new ForbiddenError('Some contents exists for the respective field. Please delete the contents first to delete this field.');
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
      return res.status(200).json({ id: fieldId });
    }
    throw new ServerError('Not able to connect with Server');
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

module.exports = {
  updateField,
  deleteField,
  createField,
  reOrderFields,
};
