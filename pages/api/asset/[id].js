const { findAsset, deleteAsset, updateAsset } = require('../../../api-controllers/asset-controller');

const assetHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return findAsset(req, res);
    case 'DELETE':
      return deleteAsset(req, res);
    case 'PATCH':
      return updateAsset(req, res);
    default:
      return res.status(404).json({ name: req.method });
  }
};

module.exports = assetHandler;
