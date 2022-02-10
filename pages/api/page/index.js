const { listPagesBySlug } = require('../../../server/api-controllers/auth-controller');

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
