const Logger = require("../../lib/logger");

describe("logger", () => {
  it("should be a function", () => {
    expect(Logger).toBeFunction();
  });
  it("should return an instance of Pino when is invoked", () => {
    expect(Logger().constructor.name).toBe("Pino");
  });
  it("expect to use the serializers when a request has been sent", () => {
    let log = new Logger("unit test", { enabled: true });
    let req = { connection: {} };
    let res = { req: {}, getHeaders: () => ({}) };
    log.info({ req, res });
  });
});
