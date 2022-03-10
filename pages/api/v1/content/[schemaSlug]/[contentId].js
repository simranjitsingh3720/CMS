const route = require('../../../../../server/helpers/route-helper');

const { getContent, updateContent, deleteContent } = require('../../../../../server/api-controllers/content-controller');

// const contentHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       // return getContent(req, res);
//       return route('GET', req, res, getContent);

//     case 'PATCH':
//       // return updateContent(req, res);
//       return route('PATCH', req, res, updateContent);

//     case 'DELETE':
//       // return deleteContent(req, res);
//       return route('DELETE', req, res, deleteContent);

//     default:
//       // return '';
//       return route('', req, res);
//   }
// };

module.exports = route({
  GET: getContent,
  PATCH: updateContent,
  DELETE: deleteContent,
});

// export default contentHandler;
