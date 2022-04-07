const db = require('../../db/models');
const { MissingError, ServerError } = require('../helpers/error-helper');
const { createLog } = require('./createLog-controller');

const getFormById = async (req, res) => {
  const { query } = req;
  const { formId, embed } = query;
  if (!formId) {
    throw new MissingError('Invalid form id');
  }
  try {
    const schema = await db.Field.findAll({ where: { schemaId: formId } });
    if (schema) {
      return res.status(200).json(schema);
    }
    throw new MissingError('No Form Found');
  } catch (error) {
    throw new MissingError('No Form Found');
  }
};

const addFormContent = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;

  const schema = await db.Schema.findOne({
    where: {
      slug: schemaSlug,
    },
  });

  if (schema) {
    let responseData = body;
    try {
      responseData = JSON.parse(body);
    } catch (e) {
      responseData = body;
    }

    const schemaJSON = { ...schema.toJSON() || undefined };
    try {
      const content = await db.Content.create({
        schemaId: schemaJSON.id, schemaSlug,
      });

      const contentJSON = { ...content.toJSON() } || undefined;
      if (contentJSON) {
        let contentData = [];
        Object.keys(responseData).map((key) => {
          contentData = [...contentData, {
            attributeValue: responseData[key],
            attributeKey: key,
            contentId: content.id,
          }];
          return null;
        });
        try {
          const contentDatas = await db.ContentData.bulkCreate(contentData);

          if (contentDatas) {
            if (req.session.user) {
              createLog('UPDATE', req.session.user.id, content.id, 'CONTENT');
            }
            return res.status(201).json({ id: content.id });
          }
        } catch (error) {
          throw new ServerError('Unable to Create Content. Please try again.');
        }
      }
    } catch (error) {
      throw new ServerError('Server Error: Unable to add Content. Please try again');
    }
  }
  throw new MissingError('Schema Not Found');
};

module.exports = {
  getFormById,
  addFormContent,
};
