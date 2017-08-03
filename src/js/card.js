(function($) {
  'use strict';

  // Fade out the blog and let drop a card of the author and vice versa

  /**
   * Card
   * @constructor
   */
  var Card = function(elm, btnsel) {
    this.$openBtn = $(btnsel);
    this.$blog = $('#blog');
    this.$elm = $(elm);
    this.$closeBtn = this.$elm.find('.close-btn');
    this.$card = this.$elm.find('> .card');
  };

  Card.prototype = {

    /**
     * Run Card feature
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
      // Fade in the card
      self.$elm.fadeIn();
      // Small timeout to drop the card after that
      // the card fade in and the blog fade out
      setTimeout(function() {
        self.dropCard();
      }, 300);
    },

    /**
     * Play back the animation
     * @return {void}
     */
    playBack: function() {
      var self = this;
      // Lift the card
      self.liftCard();
      // Fade in the blog after that the card lifted up
      setTimeout(function() {
        self.$blog.fadeIn();
      }, 500);
      // Fade out the card after that the card lifted up
      setTimeout(function() {
        self.$elm.fadeOut();
      }, 500);
    },

    /**
     * Slide the card to the middle
     * @return {void}
     */
    dropCard: function() {
      var self = this;
      var cardHeight = self.$card.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (cardHeight / 2) + cardHeight;
      // if card is longer than the window
      // scroll is enable
      // and re-define offsetTop
      if (cardHeight + 30 > $(window).height()) {
        offsetTop = cardHeight;
      }
      self.$card
        .css('top', '0px')
        .css('top', '-' + cardHeight + 'px')
        .show(500, function() {
          self.$card.animate({
            top: '+=' + offsetTop + 'px'
          });
        });
    },

    /**
     * Slide the card to the top
     * @return {void}
     */
    liftCard: function() {
      var self = this;
      var cardHeight = self.$card.innerHeight();
      // default offset from top
      var offsetTop = ($(window).height() / 2) - (cardHeight / 2) + cardHeight;
      if (cardHeight + 30 > $(window).height()) {
        offsetTop = cardHeight;
      }
      self.$card.animate({
        top: '-=' + offsetTop + 'px'
      }, 500, function() {
        self.$card.hide();
        self.$card.removeAttr('style');
      });
    }
  };

  window.Card = Card;

  $(document).ready(function() {
    new Card('#about', $("#sidebar, #header").find("a[href*='#about']")).run();
    new Card('#contact', $("#sidebar, #header, #main, .report-ctr").find("a[href*='#contact']")).run();
  });
})(jQuery);
