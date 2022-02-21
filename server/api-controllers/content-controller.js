const db = require('../../models');

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
  return res.status(400).json({ message: 'Schema slug not found' });
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
  return res.status(400).json({ message: 'invalid request' });
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
    });

    return res.status(201).json({ id: content.id });
  }
  return res.status(201).json({ message: 'Schema slug not found' });
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
    const updatedContent = await db.Content.update(body, {
      where: {
        schemaId: schema.toJSON().id,
        id: contentId,
      },
    });

    if (updatedContent[0]) {
      return res.status(201).json({ id: contentId });
    }
    return res.status(400).json({ message: 'No Data exists' });
  }

  return res.status(200).json({ message: 'Schema slug not found' });
};

const deleteContent = async (req, res) => {
  const { schemaSlug, contentId } = req.query;

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

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

  return res.status(400).json({ message: 'Schema slug not found' });
};

module.exports = {
  getContent,
  listContents,
  addContent,
  updateContent,
  deleteContent,
};
