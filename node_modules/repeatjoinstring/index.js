function repeatJoinString(string, separator, times) {
  var str = string;
  for (var idx=1 ; idx < times ; idx++) {
    str = str + separator + string;
  }

  return str;
}

module.exports = repeatJoinString;
