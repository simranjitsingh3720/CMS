const { signin } = require('../../../../server/api-controllers/auth-controller');
const route = require('../../../../server/helpers/route-helper');

// const signInHandler = (req, res) => {
//   switch (req.method) {
//     case 'POST':
//       return signin(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  POST: signin,
  authRequired: false,
});

// module.exports = signInHandler;
