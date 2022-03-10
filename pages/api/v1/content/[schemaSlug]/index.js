const route = require('../../../../../server/helpers/route-helper');

const { listContents, addContent } = require('../../../../../server/api-controllers/content-controller');

// const contentHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       // return listContents(req, res);
//       return route('GET', req, res, listContents);

//     case 'POST':
//       // return addContent(req, res);
//       return route('POST', req, res, addContent);

//     default:
//       return route('', req, res);
//   }
// };

module.exports = route({
  GET: listContents,
  POST: addContent,
});

// export default contentHandler;
