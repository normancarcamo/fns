function date(x) {
  return date.only(x);
};

date.only = function(x) {
  let y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  let m = /([0-0][1-9]|[1-1][0-2])/;
  let d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  let date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);
  let regexp = new RegExp(`^${date.source}$`);
  return regexp.test(x);
};

date.time = function(x) {
  let y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  let m = /([0-0][1-9]|[1-1][0-2])/;
  let d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  let date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);

  let sp = /\s/;
  let hh = /([0-1][0-9]|[2-2][0-3])/;
  let mm = /([0-5][0-9])/;
  let ss = /([0-5][0-9])/;
  let time = new RegExp(`${hh.source}\:${mm.source}(\:${ss.source})?`);

  return new RegExp(`^${date.source}${sp.source}${time.source}$`).test(x);
};

date.iso = function(x) {
  let y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  let m = /([0-0][1-9]|[1-1][0-2])/;
  let d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  let date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);

  let sp = /(\s|\T)/;
  let hh = /([0-1][0-9]|[2-2][0-3])/;
  let mm = /([0-5][0-9])/;
  let ss = /([0-5][0-9])/;

  let e = /(\.(\d{3,3}(z|Z?)))/
  let time = new RegExp(`${hh.source}\:${mm.source}(\:${ss.source}${e.source})?`);

  let regexp = new RegExp(`^${date.source}${sp.source}(${time.source})?$`);

  return regexp.test(x);
};

date.instance = function(x) {
  let res = Object.prototype.toString.call(x) === "[object Date]" && !isNaN(x);
  return (x && res) || (x instanceof Date);
};

date.valid = function(x) {
  return date.only(x) || date.time(x) || date.iso(x) || date.instance(x)
}

module.exports = date;
