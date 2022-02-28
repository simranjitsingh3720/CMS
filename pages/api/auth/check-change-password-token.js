const { checkChangePasswordToken } = require('../../../server/api-controllers/auth-controller');

const tokenHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return checkChangePasswordToken(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = tokenHandler;
