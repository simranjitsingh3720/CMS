const { getLogs } = require('../../../../server/api-controllers/createLog-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: getLogs,
});
