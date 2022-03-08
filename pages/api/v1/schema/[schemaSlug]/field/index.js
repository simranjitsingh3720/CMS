const { createField, reOrderFields } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
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
