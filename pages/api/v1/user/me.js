const { getMe } = require('../../../../server/api-controllers/user-controller');
const route = require('../../../../server/helpers/route-helper');

// const signInHandler = (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       return getMe(req, res);
//     default:
//       return res.send('IN DEFAULT');
//   }
// };

module.exports = route({
  GET: getMe,
});

// module.exports = signInHandler;
