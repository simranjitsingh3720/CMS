const { getAllRecords } = require('../../../../server/api-controllers/dashboard-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: getAllRecords,
});
