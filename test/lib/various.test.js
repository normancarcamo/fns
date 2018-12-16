const { promise } = require('../../index');

describe("various", () => {
  describe("promise", () => {
    it("expect to be a function", () => {
      expect(promise.all).toBeFunction();
    });

    it("expect to throw Validation Error when input is not valid", () => {
      expect(() => promise.all()).toThrow(/Invalid/);
    });

    it("expect errors and result combined when option is true", () => {
      return promise.all([
        Promise.resolve(0),
        Promise.resolve(1),
        Promise.reject(new Error('First error.')),
        Promise.resolve(3),
        Promise.resolve(4),
        Promise.reject(new Error('Second error.')),
        Promise.resolve(6)
      ], true).then(result => {
        expect(result).toBeArray();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBeInstanceOf(Error);
        expect(result[3]).toBe(3);
        expect(result[4]).toBe(4);
        expect(result[5]).toBeInstanceOf(Error);
        expect(result[6]).toBe(6);
      });
    });

    it("expect to return only errors when option is false", () => {
      return promise.all([
        Promise.resolve(0),
        Promise.resolve(1),
        Promise.reject(new Error('First error.')),
        Promise.resolve(3),
        Promise.resolve(4),
        Promise.reject(new Error('Second error.')),
        Promise.resolve(6)
      ], false).catch(e => {
        expect(e).toBeArray();
        expect(e.length).toBeGreaterThanOrEqual(1);
        expect(e[0]).toBeInstanceOf(Error);
        expect(e[1]).toBeInstanceOf(Error);
      });
    });

    it("expect to return only errors when option is not set", () => {
      return promise.all([
        Promise.resolve(0),
        Promise.resolve(1),
        Promise.reject(new Error('First error.')),
        Promise.resolve(3),
        Promise.resolve(4),
        Promise.reject(new Error('Second error.')),
        Promise.resolve(6)
      ]).catch(e => {
        expect(e).toBeArray();
        expect(e.length).toBeGreaterThanOrEqual(1);
        expect(e[0]).toBeInstanceOf(Error);
        expect(e[1]).toBeInstanceOf(Error);
      });
    });

    it("expect to return only values when no errors are thrown", () => {
      return promise.all([
        Promise.resolve(0),
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
        Promise.resolve(4)
      ], false).then(e => {
        expect(e).toBeArray();
        expect(e.length).toBeGreaterThanOrEqual(1);
        expect(e).toIncludeAllMembers([0,1,2,3,4]);
      });
    });
  });
});
