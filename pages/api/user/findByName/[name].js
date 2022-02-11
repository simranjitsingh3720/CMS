const { findUserByName } = require('../../../../server/api-controllers/user-controller');

const userHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return findUserByName(req, res);
    default:
      return res.status(404).json({ message: 'not valid request' });
  }
};
module.exports = userHandler;
