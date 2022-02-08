const db = require('../db/models/index');

const listAssets = async (req, res) => {
  const assets = await db.Asset.findAll();
  return res.status(200).json(assets);
};

const createAsset = async (req, res) => {
  const { body } = req;
  const asset = await db.Asset.create(body);
  return res.status(201).json({ id: asset.id });
};

const findAsset = async (req, res) => {
  const data = req.query;

  const asset = await db.Asset.findOne({
    where: {
      ...data
    },
  });

  if (asset == null) {
    res.send('no asset found');
  } else {
    res.status(200).json({ asset });
  }
};

const findAssetByName = async (req, res) => {
  const {name} = req.query;

  const asset = await db.Asset.findAll({
    where: {
      name
    },
  });

  if (asset == null) {
    res.send('no asset found');
  } else {
    res.status(200).json({ asset });
  }
};

const deleteAsset = async (req, res) => {
  const { id } = req.query;

  await db.Asset.destroy(
    { where: { id } },
  );

  res.status(200).json(id);
};

const updateAsset = async (req, res) => {
  const { id } = req.query;
  const data = req.body;

  const updatedAsset = await db.Asset.update(
    data,
    { where: { id } },
  );

  res.status(200).json(updatedAsset.id);
};

module.exports = {
  listAssets,
  createAsset,
  findAsset,
  deleteAsset,
  updateAsset,
  findAssetByName
};
