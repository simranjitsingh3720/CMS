const route = require('../../../../../../server/helpers/route-helper');
const { updateField, deleteField, getSingleField } = require('../../../../../../server/api-controllers/field-controller');

module.exports = route({
  GET: getSingleField,
  DELETE: deleteField,
  PATCH: updateField,
});
