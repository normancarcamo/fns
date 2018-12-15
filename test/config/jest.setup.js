"use strict";

require('jest-extended');
require('jest-chain');

process.on("unhandledRejection", err => {
  if (err.message !== "test") {
    console.error("TestSuite: unhandledRejection ->", err.message);
  }
});

process.on("uncaughtException", err => {
  console.error("TestSuite: uncaughtException ->", err.message);
});

expect.extend({});

if (typeof process.env.MOCK === 'undefined') {
  process.env.MOCK = true;
} else {
  if (['true','false'].indexOf(process.env.MOCK) === -1) {
    throw new Error('"process.env.MOCK" value must be of boolean type.');
  }
}
