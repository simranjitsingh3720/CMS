const { findAssetByName } = require('../../../../server/api-controllers/asset-controller');

const assetHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return findAssetByName(req, res);
    default:
      return res.status(404).json({ message: 'not valid request' });
  }
};

module.exports = assetHandler;
