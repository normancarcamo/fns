const deepSearch = require('deep-object-search');
const promises = require('./lib/promises');
const various = require('./lib/various');
const get = require('./lib/get');
const errors = require('./lib/errors');
const is = require('./lib/is');
const to = require('./lib/to');
const logger = require('./lib/logger');
const middlewares = require('./lib/middlewares');

const fns = {
  is,
  to,
  get,
  ...promises,
  ...various,
  deepSearch,
  errors,
  logger,
  middlewares
};

module.exports = fns;
