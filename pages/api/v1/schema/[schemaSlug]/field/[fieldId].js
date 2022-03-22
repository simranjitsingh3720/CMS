const route = require('../../../../../../server/helpers/route-helper');
const { updateField, deleteField } = require('../../../../../../server/api-controllers/field-controller');

module.exports = route({
  DELETE: deleteField,
  PATCH: updateField,
});
