const { renderSingleData, updateData } = require('../../../api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return renderSingleData(req, res);
    case 'POST':
      return updateData(req, res);
    default:
      return '';
  }
};

export default handler;
