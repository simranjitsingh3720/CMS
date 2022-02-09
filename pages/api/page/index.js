const { listPagesBySlug } = require('../../../api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return listPagesBySlug(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
