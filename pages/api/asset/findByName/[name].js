const { findAssetByName} = require('../../../../api-controllers/asset-controller');

const assetHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return findAssetByName(req, res);
    default:
      return res.status(404).json({ name: req.method });
  }
};

module.exports = assetHandler;
