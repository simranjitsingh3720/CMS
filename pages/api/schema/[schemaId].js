const { getSchema, updateSchema, deleteSchema } = require('../../../server/api-controllers/schema-controller');

const schemaHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getSchema(req, res);

    case 'PATCH':
      return updateSchema(req, res);

    case 'DELETE':
      return deleteSchema(req, res);

    default:
      return '';
  }
};

export default schemaHandler;
