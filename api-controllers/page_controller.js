const db = require('../db/models/index');

export const listPageSlug = async (req, res) => {
  const data = await db.Page.findAll({
    attributes: ['slug'],
  });
  res.status(200).json({ data });
};

export const renderSingleData = async (req, res) => {
  const { pageSlug } = req.query;
  console.log('render single data ->  ', pageSlug);
  const data = await db.Page.findAll({
    where: {
      slug: pageSlug,
    },
  });
  res.status(200).json({ data });
};

export const updateData = async (req, res) => {
  const { pageSlug } = req.query;
  console.log('update -> ', pageSlug);

  const code = req.body;
  const UpdatedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: UpdatedCode }, { where: { slug: pageSlug } });
  res.status(201).json({ result });
};
