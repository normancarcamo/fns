import fns from '../../index';

describe("index.js", () => {
  it("expect to be an object", () => {
    expect(fns).toBeObject();
  });
  it("expect to have lib file names as props", () => {
    expect(fns).toContainKeys([
      "is", "to", "get", "logger", "errors", "middlewares",
      "deepSearch", "promise"
    ]);
  });
});
