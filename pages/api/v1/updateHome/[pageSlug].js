const { updateHome } = require('../../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'POST':
      return updateHome(req, res);
    default:
      return '';
  }
};

export default handler;
