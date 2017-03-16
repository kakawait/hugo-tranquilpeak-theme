(function($) {
  'use strict';

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
      });
    }
  };

  $(document).ready(function() {
    var addCard = new AddCard();
    addCard.run();
  });
})(jQuery);
