const { createLog } = require('./createLog-controller');
const db = require('../../db/models');
const { MissingError, ServerError } = require('../helpers/error-helper');

const getContent = async (req, res) => {
  const { schemaSlug, contentId } = req.query;

  const contentData = await db.ContentData.findOne({ where: { id: contentId } });
  if (contentData) {
    return res.status(200).json(contentData);
  }
  throw new MissingError('Invalid content id');
};

const listContents = async (req, res) => {
  const { schemaId, schemaSlug, contentId } = req.query;

  const contentDatas = await db.ContentData.findAll({ where: { schemaSlug } });
  if (contentDatas) {
    return res.status(200).json({ list: contentDatas });
  }

  throw new MissingError('invalid slug');
};

const addContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, schemaId } = query;

  // to get schema id from schema table
  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    try {
      const content = await db.Content.create({
        schemaId, schemaSlug,
      });
      const contentJSON = { ...content.toJSON() } || undefined;

      if (contentJSON) {
        let contentData = [];
        Object.keys(body).map((key) => {
          contentData = [...contentData, {
            attributeValue: body[key],
            attributeKey: key,
            contentId: content.id,
          }];
          return null;
        });

        const contentDatas = await db.ContentData.bulkCreate(contentData);

        if (contentDatas) {
          return res.status(201).json({ id: content.id });
        }
      }
    } catch (error) {
      throw new ServerError('Server Error: Unable to add Content. Please try again');
    }
  }
  throw new MissingError('Schema Not Found');
};

const updateContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug, contentId } = query;

  console.log('UPDAE ', query);

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    const updatedContent = await db.ContentData.update({
      ...body,
      updatedBy: req.session.user.id,
    }, {
      where: {
        schemaSlug,

      },
    });

    if (updatedContent[0]) {
      createLog('UPDATE', req.session.user.id, contentId, 'CONTENT');
      return res.status(201).json({ id: contentId });
    }
    throw new MissingError('No Data exists');
  }

  throw new MissingError('Schema Not Found');
};

const deleteContent = async (req, res) => {
  const { schemaSlug, contentId } = req.query;

  console.log('DELETE ', req.query);

  const schema = await db.Schema.findOne(
    {
      where: {
        slug: schemaSlug,
      },
    },
  );

  if (schema) {
    const deletedContent = await db.ContentData.destroy({
      where: {
        schemaSlug,

      },
    });

    if (deletedContent) {
      createLog('DELETE', req.session.user.id, contentId, 'CONTENT');
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
