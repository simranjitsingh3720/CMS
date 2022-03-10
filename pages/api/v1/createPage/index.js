const route = require('../../../../server/helpers/route-helper');
const { createPage } = require('../../../../server/api-controllers/page-controller');

module.exports = route({
  POST: createPage,
});
