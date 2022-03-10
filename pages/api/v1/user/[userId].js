const { updateUser, findUser } = require('../../../../server/api-controllers/user-controller');

const userHandler = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
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
