const { findAsset, deleteAsset, updateAsset } = require('../../../../server/api-controllers/asset-controller');

const assetHandler = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return findAsset(req, res);
    case 'DELETE':
      return deleteAsset(req, res);
    case 'PATCH':
      return updateAsset(req, res);
    default:
      return res.status(404).json({ message: 'not valid request' });
  }
};

module.exports = assetHandler;
