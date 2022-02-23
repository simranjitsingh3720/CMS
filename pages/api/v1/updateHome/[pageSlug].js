const { updateHome } = require('../../../../server/api-controllers/page-controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return updateHome(req, res);
    default:
      return '';
  }
};

export default handler;
