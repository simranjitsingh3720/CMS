const { renderSingleData, updateData, deletePage } = require('../../../api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return renderSingleData(req, res);
    case 'POST':
      return updateData(req, res);
    case 'DELETE':
      return deletePage(req, res);
    default:
      return '';
  }
};

export default handler;
