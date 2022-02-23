const { signout } = require('../../../server/api-controllers/auth-controller');

const signupHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return signout(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signupHandler;
