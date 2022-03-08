const { listContents, addContent } = require('../../../../../server/api-controllers/content-controller');

const contentHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return listContents(req, res);

    case 'POST':
      return addContent(req, res);

    default:
      return '';
  }
};

export default contentHandler;
