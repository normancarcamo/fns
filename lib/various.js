module.exports.getDiff = function(a, b) {
  var diff = [];

  for (var i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) === -1) {
      diff.push(a[i]);
    }
  }

  return diff;
}
