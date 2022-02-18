const { renderHomeData, updateHomeData } = require('../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return renderHomeData(req, res);
    case 'POST':
      return updateHomeData(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
