import to from '../../lib/to';
import is from '../../lib/is';
import { input } from '../setup/to';

const { fail, pass } = input;

describe("to", () => {
  it("expect to to be an object", () => {
    expect(to).toBeObject();
  });

  describe(".boolean", () => {
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
});
