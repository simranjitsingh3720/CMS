const { request } = require('express');
const { MissingError } = require('./error-helper');

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

const route = (method, cb) => async (req, res) => {
  console.log('request ', request.method);
  try {
    if (req.method !== method) {
      throw new MissingError('Route not found');
    }
    await cb(req, res);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = route;
