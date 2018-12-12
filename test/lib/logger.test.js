const Logger = require("../../lib/logger");

describe("logger", () => {
  it("should be a function", () => {
    expect(Logger).toBeFunction();
  });
  it("should return an instance of Pino when is invoked", () => {
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        const envBackup = process.env;
        delete process.env.APP_NAME;
        delete process.env.NODE_ENV;
        delete process.env.SERVER_PORT;
        delete process.env.SERVER_HOST;
        delete process.env.LOG_ENABLED;
        delete process.env.LOG_LEVEL;
        delete process.env.LOG_PRETTY_PRINT;
        expect(Logger().constructor.name).toBe("Pino");
        process.env = envBackup;
      } else {
        const envBackup = process.env;
        process.env.APP_NAME = "demo";
        process.env.NODE_ENV = "development";
        process.env.SERVER_PORT = 3000;
        process.env.SERVER_HOST = "127.0.0.1";
        process.env.LOG_ENABLED = false;
        process.env.LOG_LEVEL = "error";
        process.env.LOG_PRETTY_PRINT = false;
        expect(Logger().constructor.name).toBe("Pino");
        process.env = envBackup;
      }
    }
  });
  it("expect to use the serializers when a request has been sent", () => {
    let log = new Logger("unit test", { enabled: true, level: "debug" });
    let req = { connection: {} };
    let res = { req: {}, getHeaders: () => {} };
    log.info({ req, res });
  });
});
