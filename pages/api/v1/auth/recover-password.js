const { recoverPassword } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const recoverPasswordHandler = (req, res) => {
//   switch (req.method) {
//     case 'POST':
//       return recoverPassword(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  POST: recoverPassword,
  authRequired: false,

});

// module.exports = recoverPasswordHandler;
