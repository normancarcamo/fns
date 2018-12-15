export const input = {
  pass: {
    boolean: [ "true", "false", true, false, !0, !!1, !!!2 ],
    file: [
      ["test file generated using to.file function", `${__dirname}/test.txt`]
    ]
  },
  fail: {
    boolean: [
      "", "sddsd", "[]", "{}",
      [], {}, 12323, "3242",
      function() {}, () => 3, null, undefined
    ],
    file: [
      ["bbbb", ""],
      [function(){}, () => {}],
      [function(){}, ""],
      ["", () => {}],
      ["", function(){}],
      [23, function(){}],
      [null, function(){}],
      [undefined, function(){}],
      [null, undefined],
      [null, {}],
      [[], {}],
      [undefined, null],
      [null, 3],
      [null, true],
      [false, true],
      ["dndkn/ddknd/dkndkd.jd", 'dlmdkdd/dkndkd/kdnnd.df'],
      [false, "dkndkfn/dfknkfn.jd"],
    ]
  }
}
