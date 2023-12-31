const { Sequelize } = require('sequelize');
const db = require('../../db/models');
const { MissingError, ValidityError, DuplicateError, ForbiddenError } = require('../helpers/error-helper');
const { createLog } = require('./createLog-controller');

const getSchema = async (req, res) => {
  const { query } = req;
  const { schemaSlug } = query;

  const schema = await db.Schema.findOne({ where: { id: schemaSlug } });
  if (schema) {
    return res.status(200).json(schema);
  }
  throw new MissingError('Schema not found');
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
    schemas = await db.Schema.findAll();
  }
  return res.status(200).json({ list: schemas });
};

const addSchema = async (req, res) => {
  const { body } = req;
  const { title, slug } = body;

  if (!title || !slug) {
    let message = '';

    if (!title) {
      message = 'Table title required';
    } else if (!slug) {
      message = 'Table slug required';
    }
    throw new ValidityError(message);
  }

  const isSlug = await db.Schema.findOne({
    where: {
      slug,
    },
  });

  if (isSlug) {
    throw new ValidityError(`Table with slug name ${slug} already exists`);
  }

  try {
    const schema = await db.Schema.create({
      ...body,
      createdBy: req.session.user.id,
      updatedBy: req.session.user.id,
    });

    const restorableData = await db.Field.findOne({
      where: {
        schemaSlug: slug,
      },
    });
    let isRestorable = false;

    if (restorableData) {
      isRestorable = true;
    }

    createLog('CREATE', req.session.user.id, schema.id, 'SCHEMA');
    return res.status(201).json({ id: schema.id, slug: schema.slug, isRestorable });
  } catch (error) {
    throw new DuplicateError(`Table with slug name ${slug} already exists`);
  }
};

const updateSchema = async (req, res) => {
  const { body, query } = req;
  const { slug } = body;
  const { schemaSlug, schemaId } = query;
  console.log(body);
  if (!schemaSlug) {
    throw new MissingError('schema slug is required');
  }

  const isSchemaSlug = await db.Schema.findAll({ where: { slug: schemaSlug } });

  if (!isSchemaSlug) {
    throw new MissingError('Table not Found');
  }
  let isSlug;
  if (slug) {
    isSlug = await db.Schema.findAll({ where: { slug } });
  }

  if (slug === schemaSlug && isSlug.length > 1) {
    throw new DuplicateError('This table slug already taken. Try with another slug name');
  }
  if (slug !== schemaSlug && isSlug.length >= 1) {
    throw new DuplicateError('This table slug already taken. Try with another slug name');
  }

  try {
    if (slug && slug !== schemaSlug) {
      await db.Field.destroy({
        where: {
          schemaSlug: slug,
        },
      });
    }

    await db.Schema.update({
      ...body,
      updatedBy: req.session.user.id,
    }, { where: { slug: schemaSlug } });

    await db.Field.update({ schemaSlug: slug }, {
      where: {
        schemaSlug,
      },
    });

    await db.Content.update({ schemaSlug: slug }, {
      where: {
        schemaSlug,
      },
    });

    createLog('UPDATE', req.session.user.id, schemaId, 'SCHEMA');
    return res.status(200).json({ id: slug });
  } catch (error) {
    throw new DuplicateError('This table slug already taken. Try with another slug name');
  }
};

const deleteSchema = async (req, res) => {
  const { schemaId } = req.query;
  const deletedSchema = await db.Schema.destroy(
    { where: { id: schemaId } },
  );
  if (deletedSchema) {
    createLog('DELETE', req.session.user.id, schemaId, 'SCHEMA');
    return res.status(200).json({ id: schemaId });
  }
  throw new MissingError('Schema not found');
};

const getSchemaBySlug = async (req, res) => {
  const { schemaSlug } = req.query;
  const schema = await db.Schema.findOne({ where: { slug: schemaSlug } });
  if (schema) {
    return res.status(200).json(schema);
  }
  throw new MissingError('Schema not found');
};

const deleteSchemaBySlug = async (req, res) => {
  const { schemaSlug, schemaId } = req.query;
  const schema = await db.Schema.findOne({ where: { slug: schemaSlug } });

  // check if data exits
  if (!schema) {
    throw new MissingError('No Schema Found');
  }
  if (schema) {
    const contents = await db.Content.findAll({
      where: { schemaSlug },
    });

    if (contents.length <= 0) {
      const deletedSchema = await db.Schema.destroy(
        { where: { slug: schemaSlug } },
      );
      if (deletedSchema) {
        createLog('DELETE', req.session.user.id, schemaId, 'SCHEMA');
        return res.status(200).json({ slug: schemaSlug });
      }
      throw new MissingError('Schema not found');
    }
    throw new ForbiddenError('There are some content for this schema, cannot delete');
  }
  throw new MissingError('Schema not found');
};

const deleteFieldBySlug = async (req, res) => {
  const { fieldSlug } = req.query;
  await db.Schema.destroy(
    { where: { slug: fieldSlug } },
  );
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
