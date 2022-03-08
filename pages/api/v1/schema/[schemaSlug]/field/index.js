const { createField, reOrderFields } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'POST':
      return createField(req, res);
    case 'PATCH':
      return reOrderFields(req, res);
    default:
      return '';
  }
};

export default fieldHandler;
