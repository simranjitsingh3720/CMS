const route = require('../../../../server/helpers/route-helper');
const { renderSingleData, updateData, deletePage, updatePageData } = require('../../../../server/api-controllers/page-controller');

module.exports = route({
  GET: renderSingleData,
  POST: updateData,
  PATCH: updatePageData,
  DELETE: deletePage,
});
