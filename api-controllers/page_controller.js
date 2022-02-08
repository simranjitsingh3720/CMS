const db = require('../db/models/index');

export const listPageSlug = async (req, res) => {
  const data = await db.Page.findAll({
    attributes: ['slug', 'name'],
  });
  res.status(200).json({ data });
};

export const renderSingleData = async (req, res) => {
  const { pageSlug } = req.query;
  const data = await db.Page.findAll({
    where: {
      slug: pageSlug,
    },
  });
  res.status(200).json({ data });
};

export const updateData = async (req, res) => {
  const { pageSlug } = req.query;
  const code = req.body;
  const UpdatedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: UpdatedCode }, { where: { slug: pageSlug } });
  res.status(201).json({ result });
};
