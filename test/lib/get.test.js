import get from '../../lib/get';
import { input } from '../data/get';

const { fail, pass } = input;

describe("get", () => {
  it("expect get to be an object", () => {
    expect(get).toBeObject();
  });

  describe("diff", () => {
    it("expect to be a function", () => {
      expect(get.diff).toBeFunction();
    });
    it("expect to throw error when input is not valid", () => {
      fail.diff.map(val => expect(() => get.diff(val)).toThrow(/Invalid/));
    });
    it("expect return array empty when no found differences", () => {
      expect(get.diff.apply(this, pass.diff[0])).toHaveLength(0);
    });
    it("expect return array no empty when found differences", () => {
      expect(get.diff.apply(this, pass.diff[1])).toHaveLength(1);
    });
  });

  describe("cwd", () => {
    it("expect to be a function", () => {
      expect(get.cwd).toBeFunction();
    });
    it("expect to throw error when input is not valid", () => {
      fail.cwd.map(val => expect(() => get.cwd(val)).toThrow(/Invalid/));
    });
    it("expect to return the cwd path when no arguments are passed in", () => {
      expect(get.cwd()).toBe(process.cwd());
    });
    it("expect to return the cwd + path when arguments are passed in", () => {
      expect(get.cwd('okay')).toBe(`${process.cwd()}/okay`);
    });
  });
});
