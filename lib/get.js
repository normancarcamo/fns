const { ValidationError } = require("./errors");
const is = require("./is");

function Get() {
  this.get = Object.create(Object.prototype, {
    diff: {
      configurable: true,
      enumerable: true,
      writable: false,
      value: (a, b) => {
        if (is.array(a) && is.array(b)) {
          let result = [];
          for (let i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1) {
              result.push(a[i]);
            }
          }
          return result;
        } else {
          throw new ValidationError("Invalid input data.");
        }
      }
    }
  });

  return this.get;
}

module.exports = new Get();
