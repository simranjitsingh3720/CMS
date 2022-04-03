const { createAssetsInBulk } = require('../../../../server/api-controllers/asset-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  POST: createAssetsInBulk,
});
