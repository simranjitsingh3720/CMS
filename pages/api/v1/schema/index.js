const route = require('../../../../server/helpers/route-helper');

const { listSchemas, addSchema } = require('../../../../server/api-controllers/schema-controller');

module.exports = route({
  GET: listSchemas,
  POST: addSchema,

});
