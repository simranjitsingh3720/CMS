const { changePassword } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const changeHandler = (req, res) => {
//   switch (req.method) {
//     case 'PATCH':
//       return changePassword(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  PATCH: changePassword,

});

// module.exports = changeHandler;
