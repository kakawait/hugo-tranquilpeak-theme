(function($) {
  'use strict';

  var sourceforgePatt = new RegExp("^https?:\/\/?(?:www\.)?(sourceforge)\.net\/(projects)(\/)?([a-zA-Z0-9-]*)\/?$"),
      thingiversePatt = new RegExp("^https?:\/\/?(?:www\.)?(thingiverse)\.com\/(thing)(:)?([0-9]*)\/?$"),
      pinshapePatt = new RegExp("^https?:\/\/?(?:www\.)?(pinshape)\.com\/(items)(\/)?([a-zA-Z0-9-]*)\/?$"),
      instructablesPatt = new RegExp("^https?:\/\/?(?:www\.)?(instructables)\.com\/(id)(\/)?([a-zA-Z0-9-]*)\/?$"),
      githubPatt = new RegExp("^https?:\/\/?(?:www\.)?(github)\.com\/?([a-zA-Z0-9\-_\.]*)(\/)?([a-zA-Z0-9\-_\.]*)\/?$"),
      projectOrigins = ['sourceforge','thingiverse','pinshape',
                        'instructables','github'];
  function parseProjectUrl(url) {
    function commonConv(m){return [m[1],m[4]]}
    var checklist = [
      { r: sourceforgePatt, conv:commonConv },
      { r: thingiversePatt, conv:commonConv },
      { r: pinshapePatt, conv:commonConv },
      { r: instructablesPatt, conv:commonConv },
      { r: githubPatt, conv:function(m){return [m[1],m.slice(2,5).join("")]} }
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
  function ajaxFailMessage($xhr) {
    var data;
    try {
      data = JSON.parse($xhr.responseText);
    } catch(e) { }
    return data ? ('<strong>Error</strong> ' + data.error) :
        ('<strong>' + $xhr.status + '</strong>: ' +
         $xhr.statusText);
  }
  function resetAddForm() {
    var $ap = $('#add-project');
    $ap.data('current', false);
    $ap.find('.project-url-dd').text('');
    $ap.find('.project-title-dd').text('');
    $ap.find('.project-download-url-dd').text('');
    $ap.find('.error-msg').html('').hide();
    $('#add-project-form').parsley().reset();
    $('#add-project-form input[name=url]').val('');
    $ap.find('.wizard').show().steps('previous');
    $ap.find('.finish').hide();
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
  $(function() {
    var $addproject = $('#add-project'),
        $wizard = $addproject.find('.wizard');
    if($addproject.length == 0)
      return;
    $wizard.steps({
      headerTag: "h4",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      enablePagination: false,
      titleTemplate: '#title#'
    });
    var parsley = $('#add-project-form').parsley();
    $addproject.find('.save-btn').click(function(){
      var current = $addproject.data('current');
      if(!current)
        return; // should not happen
      var $btn = $addproject.find('.step-confirm button');
      $btn.prop('disabled', true);
      $.ajax({
        type: "POST",
        url: "http://api.openassistive.org/v1/project/save",
        data: JSON.stringify(current.data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .then(function(data) {
          // thank you page
          $wizard.fadeOut();
          $addproject.find('.finish').fadeIn();
        })
        .fail(function($xhr) {
          $addproject.find('.step-confirm .error-msg')
            .html(ajaxFailMessage($xhr)).show();
        })
        .always(function(){ $btn.prop('disabled', false); });
    });
    $addproject.find('.back-btn').click(function(){$wizard.steps('previous')});
    $('#add-project-form').submit(function($evt) {
      $evt.preventDefault();
      $addproject.find('.error-msg').hide();
      if(!parsley.validate()) {
        return;
      }
      var $btn = $addproject.find('.step-enter button[type=submit]');
      $btn.prop('disabled', true);
      var url = $('#add-project-form input[name=url]').val();
      var m = parseProjectUrl(url);
      if(!m)
        return; // should not happen
      // GET request
      $.ajax({
        url: "http://api.openassistive.org/v1/service/"+
             encodeURIComponent(m[0])+"/project?id="+encodeURIComponent(m[1]),
        dataType: 'json'
      })
        .then(function(data) {
          // fill confirm
          $addproject.data('current', { m: m, url: url, data: data });
          $addproject.find('.project-url-dd').text(url);
          $addproject.find('.project-title-dd').text(data.title);
          $addproject.find('.project-download-url-dd').text(data.download_url);
          $wizard.steps('next');
        })
        .fail(function($xhr) {
          $addproject.find('.step-enter .error-msg')
            .html(ajaxFailMessage($xhr)).show();
        })
        .always(function(){ $btn.prop('disabled', false); });
    });
  });

  
  // Fade out the blog and let drop the add card of the author and vice versa

  /**
   * AddCard
   * @constructor
   */
  var AddCard = function() {
    this.$openBtn = $("#sidebar, #header").find("a[href*='#add']");
    this.$closeBtn = $('#add-btn-close');
    this.$blog = $('#blog');
    this.$add = $('#add');
    this.$addCard = $('#add-card');
  };

  AddCard.prototype = {

    /**
     * Run AddCard feature
     * @return {void}
     */
    run: function() {
      var self = this;
      // Detect click on open button
      self.$openBtn.click(function(e) {
        e.preventDefault();
        self.play();
      });
      // Detect click on close button
      self.$closeBtn.click(function(e) {
        e.preventDefault();
        self.playBack();
      });
    },

    /**
     * Play the animation
     * @return {void}
     */
    play: function() {
      var self = this;
      // Fade out the blog
      self.$blog.fadeOut();
      // Fade in the add card
      self.$add.fadeIn();
      // Small timeout to drop the add card after that
      // the add card fade in and the blog fade out
      setTimeout(function() {
        self.dropAddCard();
      }, 300);
    },

    /**
     * Play back the animation
     * @return {void}
     */
    playBack: function() {
      var self = this;
      // Lift the add card
      self.liftAddCard();
      // Fade in the blog after that the add card lifted up
      setTimeout(function() {
        self.$blog.fadeIn();
      }, 500);
      // Fade out the add card after that the add card lifted up
      setTimeout(function() {
        self.$add.fadeOut();
      }, 500);
    },

    /**
     * Slide the card to the middle
     * @return {void}
     */
    dropAddCard: function() {
      var self = this;
      var addCardHeight = self.$addCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (addCardHeight / 2) + addCardHeight;
      // if card is longer than the window
      // scroll is enable
      // and re-define offsetTop
      if (addCardHeight + 30 > $(window).height()) {
        offsetTop = addCardHeight;
      }
      self.$addCard
        .css('top', '0px')
        .css('top', '-' + addCardHeight + 'px')
        .show(500, function() {
          self.$addCard.animate({
            top: '+=' + offsetTop + 'px'
          });
        });
    },

    /**
     * Slide the card to the top
     * @return {void}
     */
    liftAddCard: function() {
      var self = this;
      var addCardHeight = self.$addCard.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (addCardHeight / 2) + addCardHeight;
      if (addCardHeight + 30 > $(window).height()) {
        offsetTop = addCardHeight;
      }
      self.$addCard.animate({
        top: '-=' + offsetTop + 'px'
      }, 500, function() {
        self.$addCard.hide();
        self.$addCard.removeAttr('style');
        // reset form
        resetAddForm();
      });
    }
  };

  $(document).ready(function() {
    var addCard = new AddCard();
    addCard.run();
  });
})(jQuery);
