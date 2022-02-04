const { listPageSlug } = require('../../../api-controllers/page_controller');

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return listPageSlug(req, res);
    // case 'POST':
    //   return updateData(req, res);
    default:
      // handleError(req,res);
      return '';
  }
};

export default handler;
