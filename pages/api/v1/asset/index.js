const { listAssets, createAsset } = require('../../../../server/api-controllers/asset-controller');

const assetHandler = (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }

  switch (req.method) {
    case 'GET':
      return listAssets(req, res);
    case 'POST':
      return createAsset(req, res);
    default:
      return res.status(404).json({ message: 'not valid request' });
  }
};

module.exports = assetHandler;
