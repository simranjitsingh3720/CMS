const route = require('../../../../../server/helpers/route-helper');

const { getContent, updateContent, deleteContent } = require('../../../../../server/api-controllers/contentData-controller');

module.exports = route({
  GET: getContent,
  PATCH: updateContent,
  DELETE: deleteContent,
});
