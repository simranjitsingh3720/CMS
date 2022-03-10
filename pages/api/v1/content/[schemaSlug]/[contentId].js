const { getContent, updateContent, deleteContent } = require('../../../../../server/api-controllers/content-controller');

const contentHandler = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return getContent(req, res);

    case 'PATCH':
      return updateContent(req, res);

    case 'DELETE':
      return deleteContent(req, res);

    default:
      return '';
  }
};

export default contentHandler;
