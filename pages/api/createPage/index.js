const db = require('../../../db/models/index');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const pageDetails = req.body;
    const result = await db.Page.create(pageDetails);
    res.status(201).json({ data: result });
  }
};
export default handler;
