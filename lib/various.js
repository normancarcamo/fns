const { ValidationError } = require("./errors");
const is = require("./is");

function Various() {
  this.promise = Object.create(Object.prototype, {
    all: {
      configurable: true,
      enumerable: true,
      writable: false,
      value: (arr, combine) => {
        if (is.array(arr)) {
          return Promise.all(arr.map(promise => promise.catch(e => e)))
            .then(values => {
              if (combine) {
                return values;
              } else {
                let errors = [];
                for (let value of values) {
                  if (value instanceof Error) {
                    errors.push(value);
                  };
                }
                if (errors.length) {
                  throw errors;
                } else {
                  return values;
                };
              }
            });
        } else {
          throw new ValidationError("Invalid input.");
        }
      }
    }
  });

  return this;
}

module.exports = new Various();
