const { Op, Sequelize } = require('sequelize');
const { DuplicateError, MissingError, ValidityError } = require('../helpers/error-helper');
const { createLog } = require('./createLog-controller');
const db = require('../../db/models');

const createPage = async (req, res) => {
  const { body } = req;

  const { name, slug } = body;

  const findPage = await db.Page.findOne({
    where: {
      slug,
    },
  });

  if (findPage) {
    throw new ValidityError('Slug name already taken. Try with another slug name');
  }

  if (!name) {
    let message = '';
    if (!name) {
      message = 'name is required';
    }
    throw new ValidityError(message);
  }

  let result = null;
  try {
    result = await db.Page.create({
      ...body,
      createdBy: req.session.user.id,
      updatedBy: req.session.user.id,
    });
  } catch (error) {
    throw new ValidityError('Slug name already taken. try with another slug name');
  }

  createLog('CREATE', req.session.user.id, result.id, 'PAGE');

  return res.status(201).json({ data: result });
};

const listPagesBySlug = async (req, res) => {
  const { query } = req;
  const { q, isHome } = query || '';

  if (q) {
    if (!isHome) {
      const data = await db.Page.findAll({
        attributes: ['slug', 'name', 'id'],
        where: {
          name: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')),
            'LIKE',
            `%${q}%`,
          ),
        },
      });
      return res.status(200).json({ list: data });
    }
  } else if (!isHome) {
    const data = await db.Page.findAll({
      attributes: ['slug', 'name', 'id'],
    });

    return res.status(200).json({ list: data });
  }

  const pageData = await db.Page.findOne({ where: { slug: '' } });
  if (pageData) {
    return res.status(200).json({ data: pageData });
  }
  return res.status(404).json({ message: 'Page Not Found' });
};

const renderSingleData = async (req, res) => {
  const { pageSlug } = req.query || '';

  if (pageSlug) {
    const pageData = await db.Page.findOne({ where: { slug: pageSlug } });
    if (pageData) {
      return res.status(200).json({ data: pageData });
    }
  }
  throw new MissingError('Page Not Found');
};

const updateData = async (req, res) => {
  const { pageSlug } = req.query;
  const code = req.body;

  // console.log('code : ', code);

  const assets = code['CMS-assets'];
  const css = code['CMS-css'];
  const components = code['CMS-components'];
  const styles = code['CMS-styles'];
  const html = code['CMS-html'];
  const page = await db.Page.findOne({
    where: {
      slug: pageSlug,
    },
  });

  if (page) {
    createLog('UPDATE', req.session.user.id, page.id, 'PAGE');
  }

  try {
    const result = await db.Page.update(
      {
        assets,
        components,
        css,
        html,
        styles,
        updatedBy: req.session.user.id,
      },
      { where: { slug: pageSlug } },
    );
    if (result) {
      return res.status(201).json({ data: result });
    }
    throw new MissingError('Page Not Found');
  } catch (err) {
    throw new MissingError('Page Not Found');
  }
};

const updateHomeData = async (req, res) => {
  const code = req.body;

  const assets = code['CMS-assets'];
  const css = code['CMS-css'];
  const components = code['CMS-components'];
  const styles = code['CMS-styles'];
  const html = code['CMS-html'];

  if (!code) {
    throw new ValidityError('Data required');
  }

  const page = await db.Page.findOne({
    where: {
      slug: '',
    },
  });

  if (page) {
    createLog('UPDATE', req.session.user.id, page.id, 'HOMEPAGE');
  }

  const result = await db.Page.update(
    {
      assets,
      components,
      css,
      html,
      styles,
      updatedBy: req.session.user.id,
    },
    { where: { slug: '' } },
  );
  if (result) {
    return res.status(201).json({ data: result });
  }
  throw new MissingError('Page Not Found');
};

const updateHome = async (req, res) => {
  const { pageSlug, pageId } = req.query;

  const findOldHome = await db.Page.findOne({
    attributes: [[Sequelize.fn('MAX', Sequelize.col('slug')), 'slug']],
    where: {
      slug: {
        [Op.substring]: 'oldHome',
      },
    },
    paranoid: false,
  });

  if (findOldHome.dataValues.slug) {
    const arr = findOldHome.dataValues.slug.split('oldHome');
    const countOldHome = ~~arr[arr.length - 1] + 1;
    const result = await db.Page.update(
      {
        slug: `oldHome${countOldHome}`,
        isHome: 0,
        name: `Old Home-${countOldHome}`,
        updatedBy: req.session.user.id,
      },
      { where: { isHome: 1 } },
    );
    const result2 = await db.Page.update(
      { slug: '', isHome: 1, name: 'Home' },
      { where: { slug: pageSlug } },
    );
    if (result && result2) {
      createLog('UPDATE', req.session.user.id, pageId, 'PAGE');
      return res.status(201).json({ data: result2 });
    }
  }
  const result = await db.Page.update(
    { slug: 'oldHome', isHome: 0, name: 'Old Home' },
    { where: { isHome: 1 } },
  );
  const result2 = await db.Page.update(
    { slug: '', isHome: 1, name: 'Home' },
    { where: { slug: pageSlug } },
  );
  if (result && result2) {
    createLog('UPDATE', req.session.user.id, pageId, 'PAGE');
    return res.status(201).json({ data: result2 });
  }
  throw new MissingError('Page Not Found');
};

const deletePage = async (req, res) => {
  const { pageSlug, pageId } = req.query;

  const deletedPage = await db.Page.destroy({ where: { slug: pageSlug } });
  const result = await db.Page.update(
    { slug: '' },
    {
      where: { slug: pageSlug },
      paranoid: false,
    },
  );
  if (deletedPage && result) {
    createLog('DELETE', req.session.user.id, pageId, 'PAGE');
    return res.status(200).json({ slug: pageSlug });
  }
  throw new MissingError('Page Not Found');
};

const updatePageData = async (req, res) => {
  const { pageSlug, pageId } = req.query || '';
  const pageData = req.body;

  if (pageData.name.trim().length < 1) {
    throw new MissingError('Page Name required');
  }

  try {
    if (pageSlug) {
      const isSlug = await db.Page.findOne({ where: { slug: pageData.slug } });

      if (pageData.slug === pageSlug && isSlug.length > 1) {
        throw new DuplicateError('Slug name already taken. Try with another slug name');
      }

      if (isSlug && pageData.slug !== pageSlug) {
        throw new DuplicateError('Slug name already taken. Try with another slug name');
      }

      const result = await db.Page.update(
        {
          name: pageData.name,
          slug: pageData.slug,
        },
        { where: { slug: pageSlug } },
      );
      if (result) {
        createLog('UPDATE', req.session.user.id, pageId, 'PAGE');
        return res.status(201).json({ data: result });
      }
    }
    const result = await db.Page.update(
      { name: pageData.name },
      { where: { slug: '' } },
    );
    if (result) {
      createLog('UPDATE', req.session.user.id, pageId, 'PAGE');
      return res.status(201).json({ data: result });
    }
    throw new MissingError('Page Not Found');
  } catch (error) {
    throw new DuplicateError('Slug name already taken. Try with another slug name');
  }
};

module.exports = {
  createPage,
  listPagesBySlug,
  renderSingleData,
  updateData,
  updateHomeData,
  updateHome,
  deletePage,
  updatePageData,
};
