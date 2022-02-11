const { listUser } = require('../../../server/api-controllers/user-controller');

const signInHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return listUser(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signInHandler;
