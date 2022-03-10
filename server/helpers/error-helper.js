/* eslint-disable max-classes-per-file */

class ExtendedError extends Error {
  constructor(message, name, code, details) {
    super(message);
    this.name = name || 'Extended Error';
    this.code = code || 500;
    this.details = details || undefined;
  }
}

class ValidityError extends ExtendedError {
  constructor(message, details) {
    super(message, 'ValidityError', 400, details);
  }
}

class ForbiddenError extends ExtendedError {
  constructor(message) {
    super(message, 'ForbiddenError', 403);
  }
}

class AuthorizationError extends ExtendedError {
  constructor(message) {
    super(message, 'AuthorizationError', 401);
  }
}

class MissingError extends ExtendedError {
  constructor(message) {
    super(message, 'MissingError', 404);
  }
}

class DuplicateError extends ExtendedError {
  constructor(message) {
    super(message, 'DuplicateError', 409);
  }
}

class UploadError extends ExtendedError {
  constructor(message) {
    super(message, 'UploadError', 404);
  }
}

class ServerError extends ExtendedError {
  constructor(message) {
    super(message, 'ServerError', 500);
  }
}

module.exports = {
  ExtendedError,
  ValidityError,
  ForbiddenError,
  AuthorizationError,
  MissingError,
  DuplicateError,
  UploadError,
  ServerError,
};
