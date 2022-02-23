const { createPage } = require('../../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return createPage(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
