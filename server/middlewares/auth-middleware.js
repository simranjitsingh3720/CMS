const authMiddleware = (req, res, next) => {
  const { path } = req;
  console.log(path);
  if (req.session.user) {
    if (path === '/admin/signin' || path === '/admin/signup' || path === '/admin/forgot-password') {
      res.redirect('/admin');
    }
  } else {
    // if (path === '/admin/signin') {
    //   // res.redirect('/admin/signin');
    //   // res.redirect = '/admin/signin';
    //   next();
    // }

    // if (path === '/admin/signup' || path === '/admin/forgot-password') {
    //   next();
    // }
    next();
    // res.redirect('/admin/signin');
    // res.redirect = '/admin/signin';
  }
  console.log('res ', res.redirect);
  next();
};
module.exports = authMiddleware;
