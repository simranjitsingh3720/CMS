const { MissingError, AuthorizationError } = require('./error-helper');

const nativeErrors = [
  'EvalError',
  'InternalError',
  'ReferenceError',
  'RangeError',
  'SyntaxError',
  'TypeError',
  'URIError',
];

const errorHandler = (err, res) => {
  if (nativeErrors.indexOf(err.name) === -1 && err.code <= 500) {
    return res.status(err.code || 500).json({
      code: err.name,
      messages: [err.message],
      details: err.details,
    });
  }

  return res.status(500).json({
    code: err.name,
    messages: [
      ...err.stack.split('\n'),
    ],
  });
};

const route = (methodControllers) => async (req, res) => {
  try {
    if (methodControllers.authRequired && !req.session.user) {
      throw new AuthorizationError('You are not authorized.');
    }
    const controller = methodControllers[req.method];

    if (!controller) {
      throw new MissingError('Route not found');
    }
    await controller(req, res);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = route;
