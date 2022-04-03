const route = require('../../../../../server/helpers/route-helper');

const { listContents, addContent } = require('../../../../../server/api-controllers/contentData-controller');

module.exports = route({
  GET: listContents,
  POST: addContent,
});
