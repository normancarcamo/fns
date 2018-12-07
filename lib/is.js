function Is() {
  Object.defineProperty(this, "negate", {
    value: false,
    writable: true,
  });

  const getResult = (res, ignoreNot) => {
    if (ignoreNot) {
      return res;
    } else {
      if (this.negate) {
        this.negate = false;
        return !res;
      } else {
        return res;
      }
    }
  }

  this.is = Object.create(Object.prototype, {
    not: {
      configurable :true,
      enumerable: true,
      get: () => {
        this.negate = true;
        return this.is;
      }
    },
    null: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(x === null && typeof x === 'object', i)
    },
    undefined: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(typeof x === "undefined", i)
    },
    string: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(typeof x === 'string', i)
    },
    boolean: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(typeof x === 'boolean', i)
    },
    number: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        return getResult(typeof x === 'number' || /^([0-9])+(\.)?[0-9]+$/gmi.test(x), i);
      }
    },
    array: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        let res = Object.prototype.toString.call(x) === '[object Array]' || Array.isArray(x);
        return getResult(res, i)
      }
    },
    object: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        if (Object.prototype.toString.call(x) !== '[object Object]') {
          return getResult(false, i);
        } else {
          let prototype = Object.getPrototypeOf(x)
          let res = prototype === null || prototype === Object.prototype;
          return getResult(res, i);
        }
      }
    },
    function: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        let res = Object.prototype.toString.call(x) === '[object Function]';
        return getResult(res, i);
      }
    },
    browser: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(typeof window !== 'undefined', i)
    },
    empty: {
      configurable :true,
      enumerable: true,
      value: function(x, i) {
        let res;

        if (this.is.undefined(x, true) || !arguments.length) {
          res = false;
          return getResult(res, i);
        }

        if (this.is.function(x, true)) {
          let start = x.toString().search(/\{/i) + 1;
          let content = x.toString().substr(start).trim();
          let end = content.search(/\}$/g) - 1;
          res = !content.substr(0, end).length;
          return getResult(res, i);
        }

        if (this.is.array(x, true)) {
          res = x.length === 0;
        } else if (this.is.object(x, true)) {
          res = Object.keys(x).length === 0;
        } else if (this.is.string(x, true)) {
          res = x.length === 0;
        }  else {
          res = false;
        }

        return getResult(res, i);
      }.bind(this)
    },
    UUID: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        let versions = [
          /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v1
          /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v2
          /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v3
          /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v4
          /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i  // v5
        ];
        let res;

        for (let v of versions) {
          if (v.test(x)) {
            res = true;
            break;
          } else {
            res = false;
          }
        }

        return getResult(res, i);
      }
    },
    promise: {
      configurable: true,
      enumerable: true,
      value: (x, i) => getResult(x instanceof Promise, i),
    },
    integer: {
      configurable: true,
      enumerable: true,
      value: (x, i) => {
        if (this.is.number(x, true)) {
          if (x < 0) {
            // Just get the number without the hyphen:
            x = x.toString().substr(1);
          } else {
            // replaces undesired chars like a dot at the end:
            x = x.toString();
          }
          // checks if its decimal to reject it:
          if (/^([0-9]+)(\.+)([0-9]+)$/gmi.test(x)) {
            return getResult(false, i);
          } else {
            return getResult(true, i);
          }
        } else {
          return getResult(false, i);
        }
      }
    },
    ipv4: {
      configurable: true,
      enumerable: true,
      value: (x, i) => {
        let res;
        if (/\d$/.test(String(x))) {
          let blocks = String(x).split(".");
          if (blocks.length === 4) {
            res = blocks.every(function(block) {
              let value = parseInt(block, 10);
              if (value >= 0 && value <= 255) {
                let i = block.length;
                while (i--) {
                  if (block[i] < '0' || block[i] > '9') {
                    return false;
                  }
                }
                return true;
              }
            });
          } else {
            res = false;
          }
        } else {
          res = false;
        }
        return getResult(res, i);
      }
    }
  });

  return this.is;
}

module.exports = new Is();
