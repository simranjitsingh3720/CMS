const { createField } = require('../../../../../../server/api-controllers/field-controller');

const fieldHandler = async (req, res) => {
  switch (req.method) {
    // case 'PATCH':
    //   return updateField(req, res);
    case 'POST':
      return createField(req, res);
      // case 'DELETE':
      //   return deleteField(req, res);

    default:
      return '';
  }
};

export default fieldHandler;
