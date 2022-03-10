const { findAsset, deleteAsset, updateAsset } = require('../../../../server/api-controllers/asset-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: findAsset,
  DELETE: deleteAsset,
  PATCH: updateAsset,
});
