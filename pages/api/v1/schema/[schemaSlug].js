const { getSchemaBySlug, updateSchema, deleteSchemaBySlug } = require('../../../../server/api-controllers/schema-controller');

const schemaHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return getSchemaBySlug(req, res);

    case 'PATCH':
      return updateSchema(req, res);

    case 'DELETE':
      return deleteSchemaBySlug(req, res);

    default:
      return '';
  }
};

export default schemaHandler;
