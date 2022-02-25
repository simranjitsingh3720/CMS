const { recoverPassword } = require('../../../server/api-controllers/auth-controller');

const recoverPasswordHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return recoverPassword(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = recoverPasswordHandler;
