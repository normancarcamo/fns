const deepSearch = require('deep-object-search');
const promises = require('./lib/promises');
const various = require('./lib/various');
const is = require('./lib/is');

const fns = {
  is,
  deepSearch,
  ...promises,
  ...various
};

module.exports = fns;
