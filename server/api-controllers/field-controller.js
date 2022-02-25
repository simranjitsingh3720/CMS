import { useRouter } from 'next/router';

const { Op } = require('sequelize');
const db = require('../../db/models');

const updateField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  const updatedSchema = await db.Schema.update({ ...body }, { where: { slug: schemaSlug } });

  if (updatedSchema[0]) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema not found' });
};
const deleteField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  const updatedSchema = await db.Schema.update({ ...body }, { where: { slug: schemaSlug } });

  if (updatedSchema) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema ?????not found' });
};
const createField = async (req, res) => {
  const { body, query } = req;
  const { schemaSlug } = query;
  console.log(body);

  const updateField = await db.Schema.update({ ...body }, { where: { slug: schemaSlug } });

  if (updateField) {
    return res.status(200).json({ id: schemaSlug });
  }
  return res.status(404).json({ message: 'Schema -//----> not found' });
};
module.exports = {
  updateField,
  deleteField,
  createField,
};
