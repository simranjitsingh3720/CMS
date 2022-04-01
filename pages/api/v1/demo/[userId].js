const { updateUser } = require('../../../../server/api-controllers/demo-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  PATCH: updateUser,
});
