const { signout } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  GET: signout,
});
