const { listUser, changePassword } = require('../../../../server/api-controllers/user-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: listUser,
  PATCH: changePassword,
});
