const { getMe } = require('../../../server/api-controllers/user-controller');

const signInHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return getMe(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signInHandler;
