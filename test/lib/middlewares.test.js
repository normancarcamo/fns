import { logger, notFound, errors, methodNotAllowed } from '../../lib/middlewares';

describe('middlewares', () => {
  describe('logger', () => {
    it('should call next() when "log" is set', () => {
      // Arrange:
      let spy = { called: false };
      let req = {};
      let res = { on(event, cb) { cb() } };
      let next = () => { spy.called = true; };

      // Act:
      logger(req, res, next);

      // Assert:
      expect(req).toContainKeys(['start', 'id', 'log', 'seq', 'error']);
      expect(spy.called).toBe(true);
    });
  });

  describe('notFound', () => {
    it('should throw error: "/apiv1 could not be found"', () => {
      // Arrange:
      let req = { url: '/apiv2' };
      let res = {};
      let next = () => {};

      // Act:
      let result = () => notFound(req, res, next);

      // Assert:
      expect(result).toThrowError(/could not be found/);
    });
  });

  describe('errors', () => {
    [
      { name: "should return error when is not production", env: "development" },
      { name: "should return error when is production", env: "production" }
    ].forEach(test => {
      it(test.name, () => {
        [
          { error: function() {} },
          null
        ].forEach(logFn => {
          // Arrange:
          let payload = null;
          let error = { name: "fake" };
          let req = { app: { get: () => test.env }, log: logFn };
          let res = { json: arg0 => { payload = arg0; }, status: code => res };
          let next = () => {};
          let isProd = test.env === "production";

          // Act:
          errors(error, req, res, next);

          // Assert:
          expect(req.error).toBe(true);
          expect(payload).not.toBe(null);
          if (isProd) {
            expect(payload.error).toBe(undefined);
          } else {
            expect(payload.error).toBeDefined();
          }
        })
      });
    });

    it('should call the next function when error is not thrown', () => {
      // Arrange:
      let spy = { called: false };
      let error = null;
      let req = {};
      let res = {};
      let next = () => { spy.called = true; };

      // Act:
      errors(error, req, res, next);

      // Assert:
      expect(spy.called).toBe(true);
    });
  });

  describe('methodNotAllowed', () => {
    it('should throw error: "Method not allowed"', () => {
      // Arrange:
      let req = {}, res = {};

      // Act:
      let result = () => methodNotAllowed(req, res);

      // Assert:
      expect(result).toThrowError(/Method not allowed/);
    });
  });
});
