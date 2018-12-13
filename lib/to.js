const { ValidationError } = require("./errors");

function To() {
  this.to = Object.create(Object.prototype, {
    boolean: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: str => {
        if (str === "false" || str === "true" || typeof str === "boolean") {
          return JSON.parse(str);
        } else {
          throw new ValidationError('Invalid input', {});
        }
      }
    }
  });
  return this.to;
}

module.exports = new To();
