const { listContents, addContent } = require('../../../../api-controllers/content_cotroller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return listContents(req, res);

    case 'POST':
      return addContent(req, res);
    default:
      // handleError(req,res);
      return res.status(404).json({ name: req.method });
  }
};

export default handler;
