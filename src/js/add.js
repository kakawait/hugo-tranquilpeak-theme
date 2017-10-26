(function($) {
  'use strict';

  var sourceforgePatt = new RegExp("^https?:\/\/?(?:www\.)?(sourceforge)\.net\/(projects)(\/)?([a-zA-Z0-9-]*)\/?$"),
      thingiversePatt = new RegExp("^https?:\/\/?(?:www\.)?(thingiverse)\.com\/(thing:?[0-9]*)\/?$"),
      pinshapePatt = new RegExp("^https?:\/\/?(?:www\.)?(pinshape)\.com\/(items)(\/)?([a-zA-Z0-9-]*)\/?$"),
      hackadayPatt = new RegExp("^https?:\/\/?(?:www\.)?(hackaday)\.io\/(project)(\/)?([a-zA-Z0-9-]*)\/?$"),
      instructablesPatt = new RegExp("^https?:\/\/?(?:www\.)?(instructables)\.com\/(id)(\/)?([a-zA-Z0-9-]*)\/?$"),
      githubPatt = new RegExp("^https?:\/\/?(?:www\.)?(github)\.com\/?([a-zA-Z0-9\-_\.]*)(\/)?([a-zA-Z0-9\-_\.]*)\/?$"),
      httpfilePatt = new RegExp("^https?://([a-z\\d-]+\\.){1,}[a-z\\d]{2,}/.*\.md$", "i"),
      dropboxPatt = new RegExp("^https?:\\/\\/(?:www\.)?(dropbox)\.com\/([^\?\\s]+)(?:\\?dl=[01])?$"),
      projectOrigins = ['sourceforge','thingiverse','pinshape','hackaday',
                        'instructables','github','dropbox','httpfile'],
      apiurl = '//api.openassistive.org/';
  if((location+'').match(/^https?:\/\/localhost[:\/]/))
    apiurl = 'http://localhost:5000/'; // for development
  function parseProjectUrl(url) {
    function commonConv(m) {
      return [ m[1], { id: m[4] } ]
    }
    var checklist = [
      { r: sourceforgePatt, conv:commonConv },
      { r: thingiversePatt,
        conv:function(m){ return [ m[1], { id: m[2] } ]; } },
      { r: pinshapePatt, conv:commonConv },
      { r: hackadayPatt, conv:commonConv },
      { r: instructablesPatt, conv:commonConv },
      { r: githubPatt,
        conv: function(m) { return [ m[1],{ id: m.slice(2,5).join("") } ] } },
      { r: dropboxPatt,
        conv: function(m) { return [ m[1], { id: m[2] } ] } },
      { r: httpfilePatt,
        conv:function(m) { return [ 'httpfile', { url: m[0] } ] } },
    ];
    for(var i = 0, len = checklist.length; i < len; ++i) {
      var item = checklist[i];
      var match = item.r.exec(url);
      if(match != null) {
        return item.conv(match);
      }
    }
    return null;
  }
  function respFailMessage(resp) {
    return '<strong>Error</strong> ' + resp.error;
  }
  function ajaxFailMessage($xhr) {
    var data;
    try {
      data = JSON.parse($xhr.responseText);
    } catch(e) { }
    return data ? ('<strong>Error</strong> ' + data.error) :
        ('<strong>' + $xhr.status + '</strong>: ' +
         $xhr.statusText);
  }
  function updateHeight() {
    $('.add-wrapper .collapsable').each(function(){
      collapsable_update_height(this)
    });
  }
  // add parsley project url validator
  window.Parsley.addValidator('projectUrl', {
    validateString: function(url) {
      return !url || parseProjectUrl(url) != null;
    },
    messages: {
      en: 'Unkown url has given, Known hosts are ('+projectOrigins.join(', ')+')'
    }
  });
  // public func, used at home.js
  window.addSelectSubmit = function($evt, url, callback) {
    var $form = $(this),
        parsley = $form.parsley();
    $evt.preventDefault();
    // [for now] check for validity of url
    $form.find('.error-msg').hide();
    if(!parsley.validate()) {
      updateHeight()
      return false;
    }
    var $btn = $form.find('button[type=submit]');
    $btn.prop('disabled', true);
    url = url || $form.find('input[name=url]').val();
    var m = parseProjectUrl(url);
    if(!m)
      return false; // should not happen
    // GET request
    $.ajax({
      url: apiurl + "v1/service/"+
        encodeURIComponent(m[0])+"/project?"+$.param(m[1]),
      dataType: 'json'
    })
      .then(function(data) {
        if(data.error) {
          $form.find('.error-msg').html(respFailMessage(data)).show();
          updateHeight()
          return;
        }
        if(!callback) {
          // goto submit page
          window.location = ($form.data('add-submit-url')||'') + '?' +
            $.param($.extend({ service: m[0] }, m[1]));
        } else {
          callback($.extend({ service: m[0] }, m[1]));
        }
      })
      .fail(function($xhr) {
        $form.find('.error-msg').html(ajaxFailMessage($xhr)).show();
        updateHeight()
      })
      .always(function(){ $btn.prop('disabled', false); });
    return true;
  }
  function _addSelectInit() {
    $('#add-project-select-form').submit(addSelectSubmit);
  }
  function _addSubmitInit() {
    var $form = $('#add-project-submit-form'),
        $wrp = $form.parents('.add-wrapper');
    $form.find('.multiselect2').select2(); // should get called before parsley
    // replace selects to display errors at bottom
    $form.find('.multiselect2')
      .each(function(){ $(this).parent().append(this); });
    var $tags = $("#tags-select2"),
        parsley = $form.parsley(), // initiate parsley
        // load data
        query = parseStringQueries(),
        service = query.service,
        inputquery = {}, // subset of query [id,url]
        data, _data;
    $.each(query, function(k,v) {
      if(['id','url'].indexOf(k) != -1)
        inputquery[k] = v;
    });
    function loadingFinished(success, msg) {
      $wrp.find('.state-loading').addClass('finished');
      setTimeout(function() {
        var elm = $wrp.find('.state-after-loading')[0];
        if(elm)
          collapsable_toggle(elm, false);
      }, 500); // delay
      if(!success) {
        $form.find('.error-msg').html(msg).show();
        updateHeight()
        $form.find('button[type=submit]').prop('disabled', true);
      }
    }
    function updateForm() {
      for(var key in data) {
        var $inp = $form.find('input,textarea,select')
            .filter('[name="'+key+'"]');
        if($inp.length > 0)
          $inp.val(data[key] || '');
      }
    }
    function dataWithFormInput() {
      var d = $.extend({}, data);
      $form.find('input,textarea,select')
        .each(function() {
          if(this.name)
            d[this.name] = this.value;
        });
      d.tags = $tags.val();
      return d;
    }
    if(!service || !(inputquery.id || inputquery.url)) {
      loadingFinished(false, "service and id/url parameters are required!");
      return;
    }
    $.ajax({
      url: apiurl + "v1/service/"+
        encodeURIComponent(service)+"/project?"+$.param(inputquery),
      dataType: 'json'
    })
      .then(function(resp) {
        loadingFinished(true);
        if(resp.error) {
          $form.hide();
          $wrp.find('.outer-error-msg').html(respFailMessage(resp)).show();
          updateHeight()
          return;
        }
        _data = resp;
        
        data = $.extend({}, _data);
        $.each(['exists','current_url'],
               function(i, prop) { delete data[prop]; });
        // exceptions

        // category
        if(Array.isArray(data.categories) && data.categories.length > 0)
          data.category = data.categories[0];
        
        if(_data.has_unmoderated) {
          $form.hide();
          $wrp.find('.outer-error-msg').html(
            "The project has an un-moderated item in queue, You can submit new change after It's processed"
          )
            .show();
          updateHeight()
          return;
        }
        
        if(_data.exists) {
          $form.find('.warning-msg').html(
            'A duplicate record exists with this short title, '
          )
            .append($('<a/>').attr('href', _data.current_url)
                    .html('Click here to see'))
            .show();
          updateHeight()
        }
        updateForm()
      })
      .fail(function($xhr) {
        loadingFinished(false, ajaxFailMessage($xhr));
      });
    $form.find('button[type=submit]').click(function() {
      setTimeout(function() {
        updateHeight() // update with delay anyway
      }, 10);
    });
    $form.submit(function($evt) {
      $evt.preventDefault();
      $form.find('.error-msg').hide();
      if(!parsley.validate()) {
        updateHeight()
        return;
      }
      var data = dataWithFormInput(),
          DEBUG_KEYWORD = "__DRYRUN__";
      if(data.project_url.lastIndexOf(DEBUG_KEYWORD) +
           DEBUG_KEYWORD.length == data.project_url.length) { // for debugging
        data.project_url = data.project_url
          .slice(0, data.project_url.length - DEBUG_KEYWORD.length);
        $form.find('[name=project_url]').val(data.project_url);
        data.dryrun = true;
      }

      // exceptions

      // category
      data.categories = [data.category];
      delete data.category;
      
      var $btn = $form.find('button[type=submit]');
      $btn.prop('disabled', true);
      $.ajax({
        type: "POST",
        url: apiurl + "v1/project/save",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .then(function(resp) {
          $btn.prop('disabled', false);
          if(resp.error) {
            $form.find('.error-msg').html(respFailMessage(resp)).show();
            updateHeight()
            return;
          }
          // thank you page
          if(data.dryrun) {
            console.log(resp);
            $form.find('.debug-result').html(JSON.stringify(resp, null, '  '))
              .show();
            updateHeight()
          } else {
            window.location = $form.data('done-goto');
          }
        })
        .fail(function($xhr) {
          $btn.prop('disabled', false);
          $form.find('.error-msg').html(ajaxFailMessage($xhr)).show();
          updateHeight()
        });
    });
    $form.find('.back-btn').click(function(){
      window.location = $(this).data('goto');
    });
  }
  $(function() {
    if($('#add-project-select-form').length > 0)
      _addSelectInit()
    if($('#add-project-submit-form').length > 0) {
      _addSubmitInit();
      $('#add-project-submit-form .more-less-btn').click(function() {
        var elm = $('#add-project-submit-form .add-form-more')[0];
        if(elm) {
          var toggle = collapsable_toggle(elm);
          $('#add-project-submit-form .more-less-btn')
            .text(toggle ? 'More' : 'Less');
        }
      });
    }
  });
})(jQuery);
