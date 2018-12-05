function To() {
  this.to = Object.create(Object.prototype, {
    boolean: {
      enumerable: true,
      configurable: true,
      writable: false,
      value: str => {
        if (str === "false" || str === "true") {
          return JSON.parse(str);
        } else {
          return false;
        }
      }
    }
  });
  return this.to;
}

module.exports = new To();
