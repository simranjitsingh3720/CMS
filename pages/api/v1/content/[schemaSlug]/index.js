const route = require('../../../../../server/helpers/route-helper');

const { listContents, addContent } = require('../../../../../server/api-controllers/content-controller');

module.exports = route({
  GET: listContents,
  POST: addContent,
});
