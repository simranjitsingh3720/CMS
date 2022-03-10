const route = require('../../../../../../server/helpers/route-helper');
const { createField, reOrderFields } = require('../../../../../../server/api-controllers/field-controller');

// const fieldHandler = async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ message: 'You are unauthorized to access this api.' });
//   }
//   switch (req.method) {
//     case 'POST':
//       // return createField(req, res);
//       return route('POST', req, res, createField);

//     case 'PATCH':
//       // return reOrderFields(req, res);
//       return route('PATCH', req, res, reOrderFields);

//     default:
//       // return '';
//       return route('', req, res);
//   }
// };

module.exports = route({
  POST: createField,
  PATCH: reOrderFields,
});

// export default fieldHandler;
