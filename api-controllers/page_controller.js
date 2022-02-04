import axios from 'axios';

const db = require('../db/models/index');

export const renderData = async (req, res) => {
  const data = await db.Page.findAll();
  res.status(200).json({ data });
};

export const updateData = async (req, res) => {
  let dataId = null;
  await axios.get('http://localhost:8000/api/page').then((response) => {
    dataId = response.data.data[1].id;
  });
  const code = req.body;
  const UpdatedCode = JSON.stringify(code);
  const result = await db.Page.update({ data: UpdatedCode }, { where: { id: dataId } });
  res.status(201).json({ result });
};
