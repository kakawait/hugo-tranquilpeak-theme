function parseStringQueries(q) {
  function _parse(s) {
    var ret = {},
        sa = s.split('&');
    for(var i = 0, len = sa.length; i < len; ++i) {
      var v = sa[i].split('=');
      ret[decodeURIComponent(v[0])] =
        decodeURIComponent(v.length > 1 ? v[1] : "");
    }
    return ret;
  }
  q = window.location.search || q;
  return _parse(q.length > 0 ? (q[0] == '?' ? q.substr(1) : q) : '');
}
