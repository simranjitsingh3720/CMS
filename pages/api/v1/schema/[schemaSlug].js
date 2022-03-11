const route = require('../../../../server/helpers/route-helper');

const { getSchemaBySlug, updateSchema, deleteSchemaBySlug } = require('../../../../server/api-controllers/schema-controller');

module.exports = route({
  GET: getSchemaBySlug,
  PATCH: updateSchema,
  DELETE: deleteSchemaBySlug,

});
