const dotenv = require('dotenv');
const aws = require('aws-sdk');
const { Sequelize } = require('sequelize');
const db = require('../../db/models');
const { createLog } = require('./createLog-controller');
const { ValidityError, ServerError } = require('../helpers/error-helper');

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

const findAsset = async (req, res) => {
  const { assetId } = req.query;

  if (!assetId) {
    throw new ValidityError('Asset ID is required');
  }

  try {
    const asset = await db.Asset.findOne({ where: { id: assetId } });
    return res.status(200).json({ asset });
  } catch (err) {
    if (err?.parent?.code === '22P02') {
      return res.status(400).json({
        code: err?.parent?.code,
        message: 'Invalid Asset ID. UUID required',
      });
    }
    return res.status(400).json({ code: err?.parent?.code, message: err?.parent?.message });
  }
};

const listAssets = async (req, res) => {
  const { query } = req;
  const { q } = query;
  let assets = [];

  try {
    if (q) {
      assets = await db.Asset.findAll({
        where: {
          name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${q}%`),

        },
      });
    } else {
      assets = await db.Asset.findAll({
      });
    }
    return res.status(200).json({ list: assets });
  } catch (err) {
    throw new ServerError('Not able to connect with server');
  }
};

const createAsset = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.type || !body.mimeType) {
    throw new ValidityError('name, type and mimeType, all are required.');
  }
  const asset = await db.Asset.create({ ...body, createdBy: req.session.user.id });
  const params = ({
    Bucket: bucketName,
    Key: `asset/${asset.id}`,
    Expires: 400000,
  });
  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  const readUrl = uploadURL.split('?')[0];
  await db.Asset.update(
    { url: readUrl, updatedBy: req.session.user.id },
    { where: { id: asset.id } },
  );
  if (req.session.user) {
    createLog('CREATE', req.session.user.id, asset.id, 'ASSET');
  }
  return res.status(201).json({ id: asset.id, writeUrl: uploadURL, readUrl });
};

const createAssetsInBulk = async (req, res) => {
  const multipleAssets = req.body;

  let assetIdList = [];

  const generateWriteUrl = async (id) => {
    const params = ({
      Bucket: bucketName,
      Key: `asset/${id}`,
      Expires: 3600,
    });

    const writeUrl = await s3.getSignedUrlPromise('putObject', params);

    return writeUrl;
  };

  multipleAssets.forEach((index) => {
    multipleAssets[index] = {
      ...multipleAssets[index],
      createdBy: (req.session.user && req.session.user.id) || null,
    };
  });

  const assets = await db.Asset.bulkCreate(multipleAssets);

  const allPromises = [];
  const readUrlArr = [];

  for (let i = 0; i < assets.length; i += 1) {
    allPromises.push(generateWriteUrl(assets[i].id));
  }

  const writeUrlList = await Promise.all(allPromises);

  for (let i = 0; i < assets.length; i += 1) {
    const readUrl = writeUrlList[i].split('?')[0];
    readUrlArr.push(readUrl);
    assetIdList = [...assetIdList, assets[i].id];

    const assetupdate = db.Asset.update(
      { url: readUrl, updatedBy: (req.session.user && req.session.user.id) || null },
      { where: { id: assets[i].id } },
    );
    if (req.session.user) {
      createLog('CREATE', req.session.user.id, assetupdate.id, 'ASSET');
    }
  }

  return res.status(201).json({ assetIdList, writeUrlList, readUrlArr });
};

const updateAsset = async (req, res) => {
  const { assetId } = req.query;
  const data = req.body;

  if (!assetId) {
    throw new ValidityError('Asset ID is required');
  }

  if (!data) {
    throw new ValidityError('Data/Body required');
  }

  try {
    await db.Asset.update({ ...data }, { where: { id: assetId } });
    if (req.session.user) { createLog('UPDATE', req.session.user.id, assetId, 'ASSET'); }
    res.status(200).json({ id: assetId });
  } catch (error) {
    throw new ServerError('Not able to connect with server');
  }
};

const deleteAsset = async (req, res) => {
  const { assetId } = req.query;
  if (!assetId) {
    throw new ValidityError('Asset ID is required');
  }

  try {
    await db.Asset.destroy({ where: { id: assetId } });
    if (req.session.user) {
      createLog('DELETE', req.session.user.id, assetId, 'ASSET');
    }
    return res.status(200).json({ id: assetId });
  } catch (err) {
    if (err?.parent?.code === '22P02') {
      return res.status(400).json({
        code: err?.parent?.code,
        message: 'Invalid Asset ID. UUID required',
      });
    }
    return res.status(400).json({ code: err?.parent?.code, message: err?.parent?.message });
  }
};

module.exports = {
  listAssets,
  createAsset,
  findAsset,
  deleteAsset,
  updateAsset,
  createAssetsInBulk,
};
