function Is() {
  Object.defineProperty(this, "negate", {
    value: false,
    writable: true,
  });

  const getResult = (res, ignore) => ignore ? res : (this.negate ? !res : res);

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
      value: (x, i) => {
        try {
          return getResult(typeof JSON.parse(x) === 'boolean', i);
        } catch (e) {
          return getResult(false, i);
        }
      }
    },
    number: {
      configurable :true,
      enumerable: true,
      value: (x, i) => getResult(!isNaN(x), i)
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
      value: (x, ignoreNot) => {
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
        } else if (this.is.array(x, true)) {
          res = x.length === 0;
        } else if (this.is.object(x, true)) {
          res = Object.keys(x).length === 0;
        } else if (this.is.string(x, true)) {
          res = x.length === 0;
        } else if (this.is.function(x, true)) {
          let start = x.toString().search(/\{/i) + 1;
          let content = x.toString().substr(start).trim();
          let end = content.search(/\}$/g) - 1;
          res = !content.substr(0, end).length;
        } else {
          res = false;
        }

        return getResult(res, i);
      }.bind(this)
    },
    semver: {
      configurable :true,
      enumerable: true,
      value: (x, i) => {
        let res = is.string(x) && x.length < 4 && /^[0-9](\.+[0-9]|)*$/g.test(x);
        return getResult(res, i);
      }
    },
    UUID: {
      configurable :true,
      enumerable: true,
      value: (x, v, i) => {
        let res;

        let v1 = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        let v2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        let v3 = /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        let v4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
        let v5 = /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

        if (v === 1 && v1.test(x)) {
          res = true;
        } else if (v === 2 && v2.test(x)) {
          res = true;
        } else if (v === 3 && v3.test(x)) {
          res = true;
        } else if (v === 4 && v4.test(x)) {
          res = true;
        } else if (v === 5 && v5.test(x)) {
          res = true
        } else if (!v && x && v4.test(x)) {
          res = true
        } else {
          res = false;
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
      value: (x, i) => getResult(this.is.number(x) && !/\./g.test(x), i)
    },
  });

  return this.is;
}

module.exports = new Is();
