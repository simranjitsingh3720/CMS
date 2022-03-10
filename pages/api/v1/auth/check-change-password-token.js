const { checkChangePasswordToken } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const tokenHandler = (req, res) => {
//   switch (req.method) {
//     case 'POST':
//       return checkChangePasswordToken(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  POST: checkChangePasswordToken,
  authRequired: false,

});

// module.exports = tokenHandler;
