const { Op, Sequelize } = require('sequelize');
const db = require('../../db/models');

export const createPage = async (req, res) => {
  const { pageDetails } = req.body;
  const result = await db.Page.create(pageDetails);
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Something went wrong, page couldn\'t created' });
};

export const listPagesBySlug = async (req, res) => {
  const { query } = req;
  const { q, isHome } = query || '';
  if (!isHome) {
    const data = await db.Page.findAll({
      attributes: ['slug', 'name'],
      where: {
        name: {
          [Op.substring]: q,
        },
      },
    });
    return res.status(200).json({ list: data });
  }

  const pageData = await db.Page.findOne({ where: { slug: '' } });
  if (pageData) {
    return res.status(200).json({ data: pageData });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

export const renderSingleData = async (req, res) => {
  const { pageSlug } = req.query || '';
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
  console.log(code);
  const stringyfiedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: stringyfiedCode }, { where: { slug: pageSlug } });
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

export const updateHomeData = async (req, res) => {
  const code = req.body;
  const stringyfiedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: stringyfiedCode }, { where: { slug: '' } });
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

export const updateHome = async (req, res) => {
  const findOldHome = await db.Page.findOne({
    attributes: [
      [Sequelize.fn('MAX', Sequelize.col('slug')), 'slug'],
    ],
    where: {
      slug: {
        [Op.substring]: 'old-home',
      },
    },
  });
  const { pageSlug } = req.query;

  if (findOldHome.dataValues.slug) {
    const arr = findOldHome.dataValues.slug.split('-');
    const countOldHome = ~~(arr[arr.length - 1]) + 1;
    const result = await db.Page.update({ slug: `old-home-${countOldHome}`, isHome: 0, name: `Old Home-${countOldHome}` }, { where: { isHome: 1 } });
    const result2 = await db.Page.update({ slug: '', isHome: 1, name: 'Home' }, { where: { slug: pageSlug } });
    if (result && result2) {
      return res.status(201).json({ data: result2 });
    }
  }
  const result = await db.Page.update({ slug: 'old-home', isHome: 0, name: 'Old Home' }, { where: { isHome: 1 } });
  const result2 = await db.Page.update({ slug: '', isHome: 1, name: 'Home' }, { where: { slug: pageSlug } });
  if (result && result2) {
    return res.status(201).json({ data: result2 });
  }

  return res.status(404).json({ message: 'Page Not Found' });
};

export const deletePage = async (req, res) => {
  const { pageSlug } = req.query;
  const deletedPage = await db.Page.destroy({ where: { slug: pageSlug } });
  if (deletedPage) {
    return res.status(200).json({ slug: pageSlug });
  }
  return res.status(404).json({ message: 'Page not found' });
};

export const updatePageData = async (req, res) => {
  const { pageSlug } = req.query || '';
  const pageData = req.body;
  if (pageSlug) {
    const result = await db.Page.update({ name: pageData.name, slug: pageData.slug }, { where: { slug: pageSlug } });
    if (result) {
      return res.status(201).json({ data: result });
    }
  }
  const result = await db.Page.update({ name: pageData.name }, { where: { slug: '' } });
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};
