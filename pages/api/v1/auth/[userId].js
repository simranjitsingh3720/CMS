const { changePassword } = require('../../../../server/api-controllers/auth-controller');

const changeHandler = (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return changePassword(req, res);
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = changeHandler;
