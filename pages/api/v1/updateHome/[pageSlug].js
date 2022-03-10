const { updateHome } = require('../../../../server/api-controllers/page-controller');
const route = require('../../../../server/helpers/route-helper');

// const handler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'POST':
//       return updateHome(req, res);
//     default:
//       return '';
//   }
// };

module.exports = route({
  POST: updateHome,

});

// export default handler;
