const db = require('../../db/models');
const { MissingError } = require('../helpers/error-helper');

const getContent = async (req, res) => {
  const { schemaSlug, contentId } = req.query;

  let content = await db.Content.findOne({
    where: {
      id: contentId,
    },
    include: {
      model: db.Schema,
      attributes: ['id'],
      where: {
        slug: schemaSlug,
      },
    },
  });
  if (content && content.Schema) {
    content = { ...content.toJSON() };
    return res.status(200).json(content);
  }
  throw new MissingError('Invalid content id');
};

const listContents = async (req, res) => {
  const { schemaSlug } = req.query;
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

    return res.status(200).json({ list: contents });
  }
  throw new MissingError('invalid slug');
};

const addContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;

  // to get schema id from schema table
  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    const content = await db.Content.create({
      ...body,
      schemaId: schema.toJSON().id,
      createdBy: req.session.user.id,
      updatedBy: req.session.user.id,
    });

    return res.status(201).json({ id: content.id });
  }
  throw new MissingError('Schema Not Found');
};

const updateContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, contentId } = query;

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    const updatedContent = await db.Content.update({ ...body, updatedBy: req.session.user.id }, {
      where: {
        schemaId: schema.toJSON().id,
        id: contentId,
      },
    });

    if (updatedContent[0]) {
      return res.status(201).json({ id: contentId });
    }
    throw new MissingError('No Data exists');
  }

  throw new MissingError('Schema Not Found');
};

const deleteContent = async (req, res) => {
  const { schemaSlug, contentId } = req.query;

  const schema = await db.Schema.findOne(
    {
      where: {
        slug: schemaSlug,
      },
    },
  );

  if (schema) {
    const deletedContent = await db.Content.destroy({
      where: {
        schemaId: schema.toJSON().id,
        id: contentId,
      },
    });

    if (deletedContent) {
      return res.status(201).json({ id: contentId });
    }
    return res.status(400).json({ message: 'No Data exists' });
  }

  return res.status(400).json({ message: 'Schema not found' });
};

module.exports = {
  getContent,
  listContents,
  addContent,
  updateContent,
  deleteContent,
};
