const { listUser, changePassword } = require('../../../../server/api-controllers/user-controller');

const signInHandler = (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are unauthorized to access this api.' });
  }
  switch (req.method) {
    case 'GET':
      return listUser(req, res);
    case 'PATCH':
      return changePassword(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signInHandler;
