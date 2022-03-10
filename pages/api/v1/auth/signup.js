const { signup } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const signupHandler = (req, res) => {
//   switch (req.method) {
//     case 'POST':
//       return signup(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  POST: signup,
  authRequired: false,
});

// module.exports = signupHandler;
