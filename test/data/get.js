export const input = {
  pass: {
    diff: [
      [[1, 2, 3], [1, 2, 3]],
      [[1, 2, 3], [1, 4, 3]]
    ],
    cwd: [
      "/absolute/path", "relative/path"
    ]
  },
  fail: {
    diff: [
      null, undefined, 1, 0, -3, {}, function() {}, () => {}, "dskjnksdfn"
    ],
    cwd: [
      null, undefined, 1, 0, -3, {}, function() {}, () => {}, ["dsk"]
    ]
  }
}
