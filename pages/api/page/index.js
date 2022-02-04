const { renderData, updateData } = require('../../../api-controllers/page_controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return renderData(req, res);
    case 'POST':
      return updateData(req, res);
    default:
      // handleError(req,res);
      break;
  }

  res.status(200).json({ name: req.method });
};

export default handler;
