const Errors = require("../../lib/errors");

describe('errors', () => {
  const parameters = [ { code: "zzzzzzzz" }, null ];

  for (let key in Errors) {
    it(`${key} - should have addtional properties`, () => {
      parameters.map(element => {
        // Arrange:
        const data = element;

        // Act:
        const result = new Errors[key]("xxxxx", data);

        // Assert:
        expect(result).toHaveProperty('status');
      });
    });
  }
});
