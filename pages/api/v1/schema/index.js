const route = require('../../../../server/helpers/route-helper');

const { listSchemas, addSchema } = require('../../../../server/api-controllers/schema-controller');

// const schemaHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       return route('GET', req, res, listSchemas);

//     case 'POST':
//       // return addSchema(req, res);
//       return route('POST', req, res, addSchema);

//     default:
//       return route('', req, res);
//   }
// };

module.exports = route({
  GET: listSchemas,
  POST: addSchema,

});

// export default schemaHandler;
