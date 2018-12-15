import to from '../../lib/to';
import { input } from '../data/to';
import setup from '../setup/to';
import fs from 'fs-extra';

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
    it("expect to be a function", () => {
      expect(to.file).toBeFunction();
    });

    it("expect to create a file when input is valid", () => {
      expect(to.file("demo", `${__dirname}/demo.txt`)).toResolve();
    });

    it("expect to throw error when input is not valid", async () => {
      expect(() => to.file(null, null)).toThrowError(/Invalid/);
    });

    afterEach(async () => {
      await fs.remove(`${__dirname}/demo.txt`);
    });
  });

  describe("JSON", () => {
    it("expect to return the data stringified when input is Object or Array", () => {
      expect(to.JSON({ enabled : true })).toBeString();
    });
    it("expect to throw ValidationError when input is not valid", () => {
      [ null, 1, "skjdnf", undefined, function() {}, () => {}
      ].forEach(input => {
        expect(() => to.JSON(input)).toThrowError(/Invalid/);
      });
    });
  });
});
