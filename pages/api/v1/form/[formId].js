const { getFormById, addFormContent } = require('../../../../server/api-controllers/form-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: getFormById,
  POST: addFormContent,
});
