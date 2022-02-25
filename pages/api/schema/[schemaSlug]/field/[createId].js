const { updateField } = require('../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return updateField(req, res);

    default:
      return '';
  }
};

export default fieldHandler;
