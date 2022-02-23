<<<<<<< HEAD:pages/api/page/[pageSlug].js
const { renderSingleData, updateData, deletePage, updatePageData } = require('../../../server/api-controllers/page-controller');
=======
const { renderSingleData, updateData, deletePage } = require('../../../../server/api-controllers/page-controller');
>>>>>>> 0816001906e0576e0e5fff2f55eb03d19171da1f:pages/api/v1/page/[pageSlug].js

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
