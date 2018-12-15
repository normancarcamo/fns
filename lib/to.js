const fs = require("fs");
const is = require("./is");
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
          throw new Error('Invalid input');
        }
      }
    },
    file: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: function(chunk, path) {
        return new Promise((resolve, reject) => {
          if (typeof chunk === "string" && typeof path === "string") {
            let writable = fs.createWriteStream(path);
            writable.on("finish", resolve);
            writable.on("error", reject);
            writable.write(chunk);
            writable.end();
          } else {
            return reject(new Error("Invalid input"));
          }
        });
      }
    },
    JSON: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: data => {
        if (is.array(data) || is.object(data)) {
          return JSON.stringify(data, null, 2)
        } else {
          throw new ValidationError("Invalid input data.");
        }
      }
    }
  });
  return this.to;
}

module.exports = new To();
