const { QueryTypes } = require('sequelize');
const { createLog } = require('./createLog-controller');
const db = require('../../db/models');
const { MissingError, ServerError } = require('../helpers/error-helper');

const getContent = async (req, res) => {
  const { contentId } = req.query;

  const contentData = await db.ContentData.findOne({ where: { contentId } });
  if (contentData) {
    return res.status(200).json(contentData);
  }
  throw new MissingError('Invalid content id');
};

const listContents = async (req, res) => {
  const { schemaSlug } = req.query;

  try {
    const ddd = await db.sequelize.query(
      'select "contentId", json_object_agg("attributeKey", "attributeValue") as data from (select "Datastore_ContentData"."contentId", "Datastore_ContentData"."attributeKey", "Datastore_ContentData"."attributeValue" from "Datastore_ContentData" join "Datastore_Contents" on "Datastore_ContentData"."contentId"="Datastore_Contents"."id" where "Datastore_Contents"."schemaSlug"=:schemaSlug and "Datastore_ContentData"."deletedAt" is :deletedAt) as json group by "contentId" ;',
      {
        replacements: { schemaSlug, deletedAt: null },
        type: QueryTypes.SELECT,
        model: db.ContentData,
      },
    );

    if (ddd) {
      return res.status(200).json({ list: ddd });
    }
    throw new MissingError('Invalid slug');
  } catch (error) {
    throw new ServerError('SomeThing Went Wrong, Please try again');
  }
};

const addContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    const schemaJSON = JSON.parse(JSON.stringify(schema));
    try {
      const content = await db.Content.create({
        schemaId: schemaJSON.id, schemaSlug,
      });

      if (content) {
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
          createLog('CREATE', (req.session.user && req.session.user.id) || null, content.id, 'CONTENT');
          return res.status(201).json({ id: content.id });
        }
      }
    } catch (error) {
      throw new ServerError('Server Error: Unable to add Content. Please try again.');
    }
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
    const schemaJSON = { ...(schema && schema.toJSON()) } || undefined;
    try {
      const content = await db.Content.findOne({
        where: {
          schemaId: schemaJSON.id, schemaSlug,
        },
      });

      const contentJSON = { ...(content && content.toJSON()) } || undefined;
      if (contentJSON) {
        let contentData = [];
        Object.keys(body).map((key) => {
          contentData = [...contentData, {
            attributeValue: body[key],
            attributeKey: key,
            contentId,
          }];
          return null;
        });

        try {
          await db.ContentData.destroy({
            where: {
              contentId,
            },
          });

          const contentDatas = await db.ContentData.bulkCreate(
            contentData,
          );

          if (contentDatas) {
            createLog('UPDATE', req.session.user.id, contentId, 'CONTENT');
            return res.status(201).json({ id: content.id });
          }
        } catch (error) {
          throw new ServerError('Unable to Delete Content. Please try again.');
        }
      }
    } catch (error) {
      throw new ServerError('Server Error: Unable to add Content. Please try again');
    }
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

  if (!schema) {
    throw new MissingError('Table not');
  }

  try {
    if (schema) {
      const deletedContent = await db.ContentData.destroy({
        where: {
          contentId,
        },
      });

      const deletedRow = await db.Content.destroy({
        where: {
          id: contentId,
        },
      });

      if (deletedContent && deletedRow) {
        createLog('DELETE', req.session.user.id, contentId, 'CONTENT');
        return res.status(201).json({ id: contentId });
      }
      return res.status(400).json({ message: 'No Data exists' });
    }
  } catch (error) {
    throw new ServerError('Unable to delete. Please try again');
  }
  throw new MissingError('Schema not found');
};

module.exports = {
  getContent,
  listContents,
  addContent,
  updateContent,
  deleteContent,
};
