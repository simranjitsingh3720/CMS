const authMiddleware = (req, res, next) => {
  const { path } = req;
  if (!path.startsWith('/admin')) {
    return next();
  }

  if (req.session.user) {
    if (path === '/admin/signin' || path === '/admin/signup' || path === '/admin/forgot-password' || path.startsWith('/admin/password-change')) {
      return res.redirect('/admin');
    }
  }
  if (!req.session.user) {
    if (path !== '/admin/signin' && path !== '/admin/signup' && path !== '/admin/forgot-password' && !path.startsWith('/admin/password-change')) {
      return res.redirect('/admin/signin');
    }
  }
  return next();
};

module.exports = authMiddleware;
