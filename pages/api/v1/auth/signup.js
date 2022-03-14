const { signup } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  POST: signup,
  authRequired: false,
});
