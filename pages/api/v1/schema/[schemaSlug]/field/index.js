const route = require('../../../../../../server/helpers/route-helper');
const { createField, reOrderFields } = require('../../../../../../server/api-controllers/field-controller');

module.exports = route({
  POST: createField,
  PATCH: reOrderFields,
});
