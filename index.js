const deepSearch = require('deep-object-search');
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
  logger,
  errors,
  middlewares,
  deepSearch,
  ...various
};

module.exports = fns;
