"use strict";

function isObject(x) {
  if (Object.prototype.toString.call(x) !== "[object Object]") {
    return false
  } else {
    var prototype = Object.getPrototypeOf(x)
    return prototype === null || prototype === Object.prototype
  }
}

/**
 * The base for all http errors.
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class BaseError extends Error {
  constructor(message, opts) {
    super(message);
    this.name = "BaseError";
    this.status = 500;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, BaseError);
  }
}

/**
 * Thrown when a resource does not allow specific methods
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class HttpError extends BaseError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "HttpError";
    this.status = 400;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, HttpError);
  }
}

/**
 * Thrown when the problem is internal,
 * for example a connection to a database is not ready.
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class BadRequestError extends HttpError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "BadRequestError";
    this.status = 400;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, BadRequestError);
  }
}

/**
 * Thrown when a parameter mismatch
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class ValidationError extends BadRequestError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "ValidationError";
    this.status = 403;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, ValidationError);
  }
}

/**
 * Thrown when a resource is not found
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class NotFoundError extends BaseError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "NotFoundError";
    this.status = 404;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, NotFoundError);
  }
}

/**
 * Thrown when the problem is internal,
 * for example a connection to a database is not ready.
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class InternalError extends BaseError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "InternalError";
    this.status = 500;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, InternalError);
  }
}

/**
 * Thrown when the problem is with the database,
 * for example a connection to a database is not ready.
 *
 * @param {string} message Error message
 * @param {Object} opts    Object to map
 */
class DatabaseError extends BaseError {
  constructor(message, opts) {
    super(message, opts);
    this.name = "DatabaseError";
    this.status = 500;
    if (isObject(opts)) {
      for (let key in opts) {
        this[key] = opts[key];
      };
    };
    Error.captureStackTrace(this, DatabaseError);
  }
}

module.exports.BaseError = BaseError;
module.exports.HttpError = HttpError;
module.exports.BadRequestError = BadRequestError;
module.exports.ValidationError = ValidationError;
module.exports.NotFoundError = NotFoundError;
module.exports.InternalError = InternalError;
module.exports.DatabaseError = DatabaseError;
