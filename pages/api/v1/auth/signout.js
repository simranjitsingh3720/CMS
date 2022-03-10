const { signout } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const signupHandler = (req, res) => {
//   switch (req.method) {
//     case 'GET':
//       return signout(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  GET: signout,
});

// module.exports = signupHandler;
