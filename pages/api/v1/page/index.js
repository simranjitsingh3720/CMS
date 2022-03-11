const route = require('../../../../server/helpers/route-helper');

const { listPagesBySlug, updateHomeData, updatePageData } = require('../../../../server/api-controllers/page-controller');

module.exports = route({
  GET: listPagesBySlug,
  POST: updateHomeData,
  PATCH: updatePageData,
});
