const { createField } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'POST':
      return createField(req, res);
    default:
      return '';
  }
};

export default fieldHandler;
