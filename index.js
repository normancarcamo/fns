const deepSearch = require('deep-object-search');
const promises = require('./lib/promises');
const various = require('./lib/various');
const errors = require('./lib/errors');
const is = require('./lib/is');
const to = require('./lib/to');
const logger = require('./lib/logger');

const fns = {
  is,
  to,
  ...promises,
  ...various,
  deepSearch,
  errors,
  logger
};

module.exports = fns;
