var Fns = function demo() {
  Object.defineProperty(this, "negate", {
    value: false,
    writable: true,
  });
  this.is = Object.create(Object.prototype, {
    not: {
      configurable:true,
      get: () => {
        this.negate = true;
        return this.is;
      }
    },
    null: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = x === null && typeof x === 'object';
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    undefined: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = typeof x === "undefined";
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    string: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = typeof x === 'string';
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    boolean: {
      configurable: true,
      value: (x, ignoreNot) => {
        try {
          let res = typeof JSON.parse(x) === 'boolean';
          if (ignoreNot) {
            return res;
          } else {
            return this.negate ? !res : res;
          }
        } catch (e) {
          let res = false;
          if (ignoreNot) {
            return res;
          } else {
            return this.negate ? !res : res;
          }
        }
      }
    },
    number: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = !isNaN(x);
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    array: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = Object.prototype.toString.call(x) === '[object Array]' || Array.isArray(x);
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    object: {
      configurable: true,
      value: (x, ignoreNot) => {
        if (Object.prototype.toString.call(x) !== '[object Object]') {
          let res = false;
          if (ignoreNot) {
            return res;
          } else {
            return this.negate ? !res : res;
          }
        } else {
          let prototype = Object.getPrototypeOf(x)
          let res = prototype === null || prototype === Object.prototype;
          if (ignoreNot) {
            return res;
          } else {
            return this.negate ? !res : res;
          }
        }
      }
    },
    function: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = Object.prototype.toString.call(x) === '[object Function]';
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    browser: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = typeof window !== 'undefined';
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    empty: {
      configurable: true,
      value: function(x, ignoreNot) {
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

        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }.bind(this)
    },
    semver: {
      configurable: true,
      value: (x, ignoreNot) => {
        let res = is.string(x) && x.length < 4 && /^[0-9](\.+[0-9]|)*$/g.test(x);
        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    },
    UUID: {
      configurable: true,
      value: (x, v, ignoreNot) => {
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

        if (ignoreNot) {
          return res;
        } else {
          return this.negate ? !res : res;
        }
      }
    }
  });
}

module.exports = new Fns();
