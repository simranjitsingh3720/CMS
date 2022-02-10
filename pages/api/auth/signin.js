const { signin } = require('../../../api-controllers/auth-controller');

const signInHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return signin(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signInHandler;
