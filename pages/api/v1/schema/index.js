import route from '../../../../server/helpers/route-helper';

const { listSchemas, addSchema } = require('../../../../server/api-controllers/schema-controller');

const schemaHandler = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return route('GET', listSchemas(req, res));

    case 'POST':
      return addSchema(req, res);

    default:
      return '';
  }
};

export default schemaHandler;
