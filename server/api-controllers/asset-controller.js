const dotenv = require('dotenv');
const aws = require('aws-sdk');
const { Sequelize } = require('sequelize');
const db = require('../../db/models');

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

const listAssets = async (req, res) => {
  const { query } = req;
  const { q } = query;
  const assets = await db.Asset.findAll({
    where: {
      name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${q}%`),

    },
  });
  return res.status(200).json({ list: assets });
};

const createAsset = async (req, res) => {
  const { body } = req;
  try {
    const asset = await db.Asset.create({ ...body });
    const params = ({
      Bucket: bucketName,
      Key: `asset/${asset.id}`,
      Expires: 3600,
    });
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const readUrl = uploadURL.split('?')[0];
    await db.Asset.update({ url: readUrl }, { where: { id: asset.id } });
    return res.status(201).json({ id: asset.id, writeUrl: uploadURL, readUrl });
  } catch (err) {
    return res.status(400).json({ message: 'File Upload failed' });
  }
};

const findAsset = async (req, res) => {
  const { assetId } = req.query;

  const asset = await db.Asset.findOne({ where: { id: assetId } });
  if (!asset) {
    return res.status(404).send({ message: 'no asset found' });
  }
  return res.status(200).json({ asset });
};

const deleteAsset = async (req, res) => {
  const { assetId } = req.query;

  await db.Asset.destroy({ where: { id: assetId } });
  res.status(200).json({ id: assetId });
};

const updateAsset = async (req, res) => {
  const { assetId } = req.query;
  const data = req.body;

  const updatedAsset = await db.Asset.update({ ...data }, { where: { id: assetId } });
  res.status(200).json({ id: updatedAsset.id });
};

module.exports = {
  listAssets,
  createAsset,
  findAsset,
  deleteAsset,
  updateAsset,
};
