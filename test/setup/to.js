export const input = {
  pass: {
    boolean: [ "true", "false", true, false, !0, !!1, !!!2 ]
  },
  fail: {
    boolean: [
      "", "sddsd", "[]", "{}",
      [], {}, 12323, "3242",
      function() {}, () => 3, null, undefined
    ]
  }
}
