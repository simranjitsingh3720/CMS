const { updateHome } = require('../../../../server/api-controllers/page-controller');
const route = require('../../../../server/helpers/route-helper');

module.exports = route({
  POST: updateHome,

});
