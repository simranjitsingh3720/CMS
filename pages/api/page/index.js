const { listPagesBySlug, updateHomeData } = require('../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return listPagesBySlug(req, res);
    case 'POST':
      return updateHomeData(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
