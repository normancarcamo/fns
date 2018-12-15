import to from '../../lib/to';
import { input } from '../data/to';
import setup from '../setup/to';

const { fail, pass } = input;
const { onBeforeEach, onAfterEach } = setup;

describe("to", () => {
  it("expect to to be an object", () => {
    expect(to).toBeObject();
  });

  describe("boolean", () => {
    it("expect to be a function", () => {
      expect(to.boolean).toBeFunction();
    });
    it("expect to throw error when input is not valid", () => {
      fail.boolean.map(v => expect(() => to.boolean(v)).toThrow(/Invalid/));
    });
    it("expect return boolean value when input is valid", () => {
      pass.boolean.map(v => expect(to.boolean(v)).toBeBoolean());
    });
  });

  describe("file", () => {
    beforeEach(onBeforeEach);

    it("expect to be a function", () => {
      expect(to.file).toBeFunction();
    });

    it("expect to resolve promise when it writes the file", async () => {
      for (let [ data, path ] of pass.file) {
        const result = await to.file.apply(this, [ data, path ]);
        expect(result).toBe(undefined);
      }
    });

    it("expect to reject promise when something is wrong", async () => {
      for (let input of fail.file) {
        try {
          await to.file.apply(this, input);
        } catch (e) {
          expect(e).toBeDefined();
          expect(e.message).toMatch(/(ENOENT|Invalid)/);
        }
      }
    });

    afterEach(onAfterEach);
  });

  describe("JSON", () => {
    it("expect to return the data stringified when input is Object or Array", () => {
      expect(to.JSON({ enabled : true })).toBeString();
    });
    it("expect to throw ValidationError when input is not valid", () => {
      let inputs = [ null, 1, "skjdnf", undefined, function() {}, () => {} ];
      for (let input of inputs) {
        expect(() => to.JSON(input)).toThrowError(/Invalid/);
      }
    });
  });
});
