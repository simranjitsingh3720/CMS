const { createField } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return createField(req, res);
    default:
      return '';
  }
};

export default fieldHandler;
