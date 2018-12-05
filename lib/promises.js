module.exports.promiseAll = function(array, combine) {
  return Promise.all(array.map(p => p.catch(e => e)))
    .then(values => {
      if (combine) {
        return values;
      }

      let errors = values.reduce((target, value) => {

        if (value instanceof Error) {
          target.push(value);
        };

        return target;
      }, []);

      if (errors.length) {
        throw errors;
      } else {
        return values;
      };
    });
}
