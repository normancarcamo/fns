const fs = require("fs");

const setup = {};

setup.meta = {};

setup.scenario = {};

setup.instance = {};

setup.onBeforeEach = () => {
  if (JSON.parse(process.env.MOCK)) {
    jest.spyOn(fs, "createWriteStream").mockImplementation(path => ({
      on: jest.fn((evt, cb) => cb()),
      end: jest.fn(() => {}),
      write: jest.fn(chunk => {})
    }));
  }
};

setup.remove = async () => {
  if (JSON.parse(process.env.MOCK)) {
    if (jest.isMockFunction(fs.createWriteStream)) {
      fs.createWriteStream.mockRestore();
    }
  } else {

  }
};

setup.onBeforeAll = setup.remove;

setup.onAfterEach = setup.remove;

export default setup;
