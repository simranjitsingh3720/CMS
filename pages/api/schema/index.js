const handler = async (req, res) => {
  res.status(200).json({ name: 'schema' });
const { listSchemas, addSchema } = require('../../../api-controllers/schema-controller');

const schemaHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return listSchemas(req, res);

    case 'POST':
      return addSchema(req, res);

    default:
      return '';
  }
};

export default schemaHandler;
