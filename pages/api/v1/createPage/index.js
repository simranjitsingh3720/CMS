const { createPage } = require('../../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'POST':
      return createPage(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
