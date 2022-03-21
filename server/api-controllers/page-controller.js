import { loadCache } from 'axios-hooks';
import { DuplicateError, MissingError, ValidityError } from '../helpers/error-helper';

const { Op, Sequelize } = require('sequelize');
const db = require('../../db/models');

export const createPage = async (req, res) => {
  const { body } = req;
  console.log('body', body);

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

  try {
    const result = await db.Page.create({
      ...body,
      createdBy: req.session.user.id,
      updatedBy: req.session.user.id,
    });

    if (result) {
      return res.status(201).json({ data: result });
    }
  } catch (error) {
    throw new ValidityError('Slug name already taken. try with another slug name');
  }
};

export const listPagesBySlug = async (req, res) => {
  const { query } = req;
  const { q, isHome } = query || '';

  if (q) {
    if (!isHome) {
      const data = await db.Page.findAll({
        attributes: ['slug', 'name'],
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
      attributes: ['slug', 'name'],
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
  throw new MissingError('Page Not Found');
};

export const updateData = async (req, res) => {
  const { pageSlug } = req.query;
  const code = req.body;
  const stringyfiedCode = JSON.stringify(code);
  const result = await db.Page.update(
    {
      data: stringyfiedCode,
      updatedBy: req.session.user.id,
    },
    { where: { slug: pageSlug } },
  );
  if (result) {
    return res.status(201).json({ data: result });
  }
  throw new MissingError('Page Not Found');
};

export const updateHomeData = async (req, res) => {
  const code = req.body;

  if (!code) {
    throw new ValidityError('Data required');
  }

  const stringyfiedCode = JSON.stringify(code);
  const result = await db.Page.update(
    {
      data: stringyfiedCode,
      updatedBy: req.session.user.id,
    },
    { where: { slug: '' } },
  );
  if (result) {
    return res.status(201).json({ data: result });
  }
  throw new MissingError('Page Not Found');
};

export const updateHome = async (req, res) => {
  const { pageSlug } = req.query;

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
    const arr = findOldHome.dataValues.slug.split('-');
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
    return res.status(201).json({ data: result2 });
  }

  throw new MissingError('Page Not Found');
};

export const deletePage = async (req, res) => {
  const { pageSlug } = req.query;

  const deletedPage = await db.Page.destroy({ where: { slug: pageSlug } });
  const result = await db.Page.update(
    { slug: '' },
    {
      where: { slug: pageSlug },
      paranoid: false,
    },
  );
  if (deletedPage && result) {
    return res.status(200).json({ slug: pageSlug });
  }
  throw new MissingError('Page Not Found');
};

export const updatePageData = async (req, res) => {
  const { pageSlug } = req.query || '';
  const pageData = req.body;
  try {
    if (pageSlug) {
      const result = await db.Page.update(
        {
          name: pageData.name,
          slug: pageData.slug,
        },
        { where: { slug: pageSlug } },
      );
      if (result) {
        return res.status(201).json({ data: result });
      }
    }
    const result = await db.Page.update(
      { name: pageData.name },
      { where: { slug: '' } },
    );
    if (result) {
      return res.status(201).json({ data: result });
    }
    throw new MissingError('Page Not Found');
  } catch (error) {
    throw new DuplicateError('Slug name already taken. Try with another slug name');
  }
};
