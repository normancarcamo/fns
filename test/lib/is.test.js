import is from '../../lib/is';
import { input } from '../setup/is';

const { fail, pass } = input;

describe("is", () => {
  describe("null", () => {
    it("expect to be valid", () => {
      pass.null.map(v => {
        expect(is.null(v)).toBeTrue();
        expect(is.not.null(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.null.map(v => {
        expect(is.null(v)).toBeFalse();
        expect(is.not.null(v)).toBeTrue();
      });
    });
  });
  describe("undefined", () => {
    it("expect to be valid", () => {
      expect(is.undefined(undefined)).toBeTrue();
      expect(is.not.undefined(undefined)).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.undefined.map(v => {
        expect(is.undefined(v)).toBeFalse();
        expect(is.not.undefined(v)).toBeTrue();
      });
    });
  });
  describe("string", () => {
    it("expect to be valid", () => {
      expect(is.string('bingo')).toBeTrue();
      expect(is.not.string('bingo')).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.string.map(v => {
        expect(is.string(v)).toBeFalse();
        expect(is.not.string(v)).toBeTrue();
      });
    });
  });
  describe("boolean", () => {
    it("expect to be valid", () => {
      expect(is.boolean(false)).toBeTrue();
      expect(is.not.boolean(false)).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.boolean.map(v => {
        expect(is.boolean(v)).toBeFalse();
        expect(is.not.boolean(v)).toBeTrue();
      });
    });
  });
  describe("number", () => {
    it("expect to be valid", () => {
      expect(is.number(2)).toBeTrue();
      expect(is.not.number(2)).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.number.map(v => {
        expect(is.number(v)).toBeFalse();
        expect(is.not.number(v)).toBeTrue();
      });
    });
  });
  describe("array", () => {
    it("expect to be valid", () => {
      expect(is.array([])).toBeTrue();
      expect(is.not.array([])).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.array.map(v => {
        expect(is.array(v)).toBeFalse();
        expect(is.not.array(v)).toBeTrue();
      });
    });
  });
  describe("object", () => {
    it("expect to be valid", () => {
      expect(is.object({})).toBeTrue();
      expect(is.not.object({})).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.object.map(v => {
        expect(is.object(v)).toBeFalse();
        expect(is.not.object(v)).toBeTrue();
      });
    });
  });
  describe("function", () => {
    it("expect to be valid", () => {
      expect(is.function(() => {})).toBeTrue();
      expect(is.not.function(() => {})).toBeFalse();
    });
    it("expect to not be valid", () => {
      fail.function.map(v => {
        expect(is.function(v)).toBeFalse();
        expect(is.not.function(v)).toBeTrue();
      });
    });
  });
  describe("browser", () => {
    it("expect to be valid", () => {
      input.pass.browser.setup();
      expect(is.browser(window)).toBeTrue();
      expect(is.not.browser(window)).toBeFalse();
      input.pass.browser.tearDown();
    });
    it("expect to not be valid", () => {
      fail.browser.map(v => {
        expect(is.browser(v)).toBeFalse();
        expect(is.not.browser(v)).toBeTrue();
      });
    });
  });
  describe("empty", () => {
    it("expect to be valid", () => {
      pass.empty.map(v => {
        expect(is.empty(v)).toBeTrue();
        expect(is.not.empty(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.empty.map(v => {
        expect(is.empty(v)).toBeFalse();
        expect(is.not.empty(v)).toBeTrue();
      });
    });
  });
  describe("UUID", () => {
    it("expect to be valid", () => {
      pass.UUID.map(v => {
        expect(is.UUID(v)).toBeTrue();
        expect(is.not.UUID(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.UUID.map(v => {
        expect(is.UUID(v)).toBeFalse();
        expect(is.not.UUID(v)).toBeTrue();
      });
    });
  });
  describe("promise", () => {
    it("expect to be valid", () => {
      pass.promise.map(v => {
        expect(is.promise(v)).toBeTrue();
        expect(is.not.promise(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.promise.map(v => {
        expect(is.promise(v)).toBeFalse();
        expect(is.not.promise(v)).toBeTrue();
      });
    });
  });
  describe("integer", () => {
    it("expect to be valid", () => {
      pass.integer.map(v => {
        expect(is.integer(v)).toBeTrue();
        expect(is.not.integer(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.integer.map(v => {
        expect(is.integer(v)).toBeFalse();
        expect(is.not.integer(v)).toBeTrue();
      });
    });
  });
  describe("ipv4", () => {
    it("expect to be valid", () => {
      pass.ipv4.map(v => {
        expect(is.ipv4(v)).toBeTrue();
        expect(is.not.ipv4(v)).toBeFalse();
      });
    });
    it("expect to not be valid", () => {
      fail.ipv4.map(v => {
        expect(is.ipv4(v)).toBeFalse();
        expect(is.not.ipv4(v)).toBeTrue();
      });
    });
  });
});
