const deepSearch = require('deep-object-search');
const promises = require('./lib/promises');
const various = require('./lib/various');
const is = require('./lib/is');
const to = require('./lib/to');

const fns = {
  is,
  to,
  ...promises,
  ...various,
  deepSearch,
};

module.exports = fns;
