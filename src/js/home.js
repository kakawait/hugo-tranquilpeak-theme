(function($) {
  'use strict';

  function _openATLookupInit($form) {
    $form.submit(function($evt) {
      var $queryinp = $form.find('input[name=query]'),
          query = $queryinp.val().trim();
      $form.parsley().destroy();
      var parsley = $form.parsley()
      if(/^https?:\/\//.test(query)) { // is url
        $queryinp.attr('data-parsley-project-url', '')
        $queryinp.attr('data-parsley-type', 'url')
        try {
          window.addSelectSubmit.call(this, $evt, query);
        } catch(err) {
          console.log(err);
          $evt.preventDefault();
        }
      } else {
        $queryinp.removeAttr('data-parsley-project-url', '')
        $queryinp.removeAttr('data-parsley-type')
        var $btn = $form.find('button[type=submit]');
        if(window.searchController) {
          $evt.preventDefault();
          var pageUrl = '?' + $.param({query: query});
          window.history.pushState('', '', pageUrl);
          $btn.prop('disabled', true);
          searchController.search(query, function() {
            $btn.prop('disabled', false);
          })
        } else {
          // nothing to do
        }
      }
    })
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
  $(function() {
    if($('#openat-lookup-form').length > 0)
      _openATLookupInit($('#openat-lookup-form'))
  });

  
})(jQuery);
