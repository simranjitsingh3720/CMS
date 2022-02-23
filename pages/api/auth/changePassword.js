const { changePassword } = require('../../../server/api-controllers/auth-controller');

const changePasswordHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return changePassword(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = changePasswordHandler;
