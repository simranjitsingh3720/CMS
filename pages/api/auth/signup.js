const { signup } = require('../../../controllers/auth-controller');

const signupHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return signup(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signupHandler;
