const db = require('../db/models/index');

export const createPage = async (req, res) => {
  const pageDetails = req.body;
  const result = await db.Page.create(pageDetails);
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Something went wrong, page couldn\'t created' });
};

export const listPagesBySlug = async (req, res) => {
  const data = await db.Page.findAll({
    attributes: ['slug', 'name'],
  });
  return res.status(200).json({ list: data });
};

export const renderSingleData = async (req, res) => {
  const { pageSlug } = req.query;
  if (pageSlug) {
    const pageData = await db.Page.findOne({ where: { slug: pageSlug } });
    if (pageData) {
      return res.status(200).json({ data: pageData });
    }
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

export const updateData = async (req, res) => {
  const { pageSlug } = req.query;
  const code = req.body;
  const stringyfiedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: stringyfiedCode }, { where: { slug: pageSlug } });
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

export const deletePage = async (req, res) => {
  const { pageSlug } = req.query;
  const deletedPage = await db.Page.destroy({ where: { slug: pageSlug } });
  if (deletedPage) {
    return res.status(200).json({ id: pageSlug });
  }
  return res.status(404).json({ message: 'Page not found' });
};
