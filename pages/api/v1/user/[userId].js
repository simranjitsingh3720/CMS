const { updateUser, findUser } = require('../../../server/api-controllers/user-controller');

const userHandler = (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return updateUser(req, res);
    case 'GET':
      return findUser(req, res);
    default:
      return res.status(404).json({ message: 'not valid request' });
  }
};

module.exports = userHandler;
