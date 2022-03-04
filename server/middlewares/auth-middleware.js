const authMiddleware = (req, res, next) => {
  // console.log('middleware');
  const { path } = req;
  // console.log('path ', path);
  // const pathArr = path.split('/');
  // console.log('pathArr => ', pathArr);
  // if (!req.session.user) {
  //   // not signed in
  if (path === '/admin/signup' || path === '/admin/signin' || path === '/admin/forgot-password' || path === '/admin/password-change') {
    return next();
  }
  return res.redirect('/admin/signin');
};
