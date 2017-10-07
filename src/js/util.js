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

function collapsable_toggle(elm, toggle) {
  toggle = toggle == null ? !elm.classList.contains('collapse') : toggle
  var initial_height = elm.offsetHeight || 0;
  if(toggle) {
    elm.classList.add('collapse')
  } else {
    var extra_height = parseFloat(elm.getAttribute('data-extra-height'))
    if(!(extra_height > 0))
      extra_height = 0;
    elm.classList.remove('collapse')
    elm.style.height = '';
    var height = elm.offsetHeight;
    // un-collapse parents
    var pelm = elm.parentNode
    while(pelm.nodeType == Node.ELEMENT_NODE) {
      if(pelm.classList.contains('collapsable')) {
        collapsable_update_height(pelm);
      }
      pelm = pelm.parentNode;
    }

    // apply transition
    if(height > 0) {
      elm.style.height = initial_height + 'px';
      setTimeout(function() {
        if(height > 0)
          elm.style.height = (extra_height + height) + 'px';
      }, 10);
    }
  }
  return toggle;
}
function collapsable_update_height(elm) {
  var extra_height = parseFloat(elm.getAttribute('data-extra-height'))
  if(!(extra_height > 0))
    extra_height = 0;
  if(!elm.classList.contains('collapse')) {
    var initial_height = elm.offsetHeight || 0;
    elm.style.height = '';
    var height = elm.offsetHeight;
    // apply transition
    if(height > 0) {
      elm.style.height = initial_height + 'px';
      setTimeout(function() {
        if(height > 0)
          elm.style.height = (height + extra_height) + 'px';
      }, 10);
    }
  }
}
