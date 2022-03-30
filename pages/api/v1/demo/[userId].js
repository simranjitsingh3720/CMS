const { updateUser, findUser } = require('../../../../server/api-controllers/demo-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: findUser,
  PATCH: updateUser,
});
