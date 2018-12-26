const fs = require("fs-extra");
const is = require("./is");
const { ValidationError } = require("./errors");
const path = require("path");

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
          throw new Error("Invalid input.");
        }
      }
    },
    file: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: (data, filepath) => {
        if (typeof data === "string" && typeof filepath === "string") {
          return fs.outputFile(filepath, data);
        } else {
          return Promise.reject(new Error("Invalid input."));
        }
      }
    },
    JSON: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: data => {
        if (is.array(data) || is.object(data)) {
          return JSON.stringify(data, null, 2);
        } else {
          throw new ValidationError("Invalid input.");
        }
      }
    }
  });
  return this.to;
}

module.exports = new To();
