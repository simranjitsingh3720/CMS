const { updateField, deleteField } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'PATCH':
      return updateField(req, res);
    case 'DELETE':
      return deleteField(req, res);

    default:
      return '';
  }
};

export default fieldHandler;
