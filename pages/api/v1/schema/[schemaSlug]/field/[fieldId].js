const route = require('../../../../../../server/helpers/route-helper');
const { updateField, deleteField } = require('../../../../../../server/api-controllers/field-controller');

// const fieldHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'PATCH':
//       // return updateField(req, res);
//       return route('PATCH', req, res, updateField);

//     case 'DELETE':
//       // return deleteField(req, res);
//       return route('DELETE', req, res, deleteField);

//     default:
//       // return '';
//       return route('', req, res);
//   }
// };

module.exports = route({
  DELETE: deleteField,
  PATCH: updateField,
});

// export default fieldHandler;
