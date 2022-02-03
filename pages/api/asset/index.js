const { listAssets, createAsset } = require('../../../api-controllers/asset-controller');

const assetHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return listAssets(req, res);
    case 'POST':
      return createAsset(req, res);
    default:
      break;
  }
};

module.exports = assetHandler;
