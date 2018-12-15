export const input = {
  pass: {
    diff: [
      [[1, 2, 3], [1, 2, 3]],
      [[1, 2, 3], [1, 4, 3]]
    ]
  },
  fail: {
    diff: [
      null, undefined, 1, 0, -3, {}, function() {}, () => {}, "dskjnksdfn"
    ]
  }
}
