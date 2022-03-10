const route = require('../../../../server/helpers/route-helper');

const { getSchemaBySlug, updateSchema, deleteSchemaBySlug } = require('../../../../server/api-controllers/schema-controller');

// const schemaHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'GET':
//       // return getSchemaBySlug(req, res);
//       return route('GET', req, res, getSchemaBySlug);

//     case 'PATCH':
//       // return updateSchema(req, res);
//       return route('PATCH', req, res, updateSchema);

//     case 'DELETE':
//       // return deleteSchemaBySlug(req, res);
//       return route('DELETE', req, res, deleteSchemaBySlug);

//     default:
//       // return '';
//       return route('', req, res);
//   }
// };

module.exports = route({
  GET: getSchemaBySlug,
  PATCH: updateSchema,
  DELETE: deleteSchemaBySlug,

});

// export default schemaHandler;
