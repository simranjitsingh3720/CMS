const { createPage } = require('../../../server/api-controllers/auth-controller');

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
