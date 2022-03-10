const route = require('../../../../server/helpers/route-helper');

const { listPagesBySlug, updateHomeData, updatePageData } = require('../../../../server/api-controllers/page-controller');

// const handler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       return listPagesBySlug(req, res);
//     case 'POST':
//       return updateHomeData(req, res);
//     case 'PATCH':
//       return updatePageData(req, res);
//     default:
//       // handleError(req,res);
//       return '';
//   }
// };

module.exports = route({
  GET: listPagesBySlug,
  POST: updateHomeData,
  PATCH: updatePageData,
});

// export default handler;
