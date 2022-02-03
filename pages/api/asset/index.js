const { listAssets, createAsset } = require('../../../api-controllers/asset-controller');

const assetHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return listAssets(req, res);
    case 'POST':
      return createAsset(req, res);
    default:
      return res.status(404).json({ name: req.method });
  }
};

module.exports = assetHandler;
