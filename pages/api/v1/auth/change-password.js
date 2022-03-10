const { changePassword } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const changePasswordHandler = (req, res) => {
//   switch (req.method) {
//     case 'POST':
//       return changePassword(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  POST: changePassword,
  authRequired: false,

});

// module.exports = changePasswordHandler;
