const { renderSingleData, updateData, deletePage, updatePageData } = require('../../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return renderSingleData(req, res);
    case 'POST':
      return updateData(req, res);
    case 'DELETE':
      return deletePage(req, res);
    case 'PATCH':
      return updatePageData(req, res);
    default:
      return '';
  }
};

export default handler;
