/* eslint-disable arrow-body-style */
const authMiddleware = (req, res, next) => {
  // if (
  //   req.path.includes('/api')
  //   && !req.path.includes('/api/auth')
  //   && !req.session.user
  // ) {
  //   return res.status(401).json({ message: 'You are not logged in' });
  // }
  return next();
};

module.exports = authMiddleware;
