(function($) {
  'use strict';

  // Open and close the sidebar by swiping the sidebar and the blog and vice versa

  /**
   * Sidebar
   * @constructor
   */
  var Sidebar = function() {
    this.$sidebar = $('#sidebar');
    this.$openBtn = $('#btn-open-sidebar');
    // Elements where the user can click to close the sidebar
    this.$closeBtn = $('#header, #main, .post-header-cover');
    // Elements affected by the swipe of the sidebar
    // The `pushed` class is added to each elements
    // Each element has a different behavior when the sidebar is opened
    this.$header = $('#header');
    this.$headerElements = {
      title: this.$header.find('.header-title'),
      titleLink: this.$header.find('.header-title-link'),
      rightPicture: this.$header.find('.header-right-picture')
    };
    this.$blog = $('.post-bottom-bar, #main, .post-header-cover, .post, #bottom-bar .post-action-share').add(this.$header).add(this.$headerElements.title).add(this.$headerElements.rightPicture);
    // If you change value of `mediumScreenWidth`,
    // you have to change value of `$screen-min: (md-min)` too
    // in `source/_css/utils/variables.scss`
    this.$body = $('body');
    this.mediumScreenWidth = 768;
  };

  Sidebar.prototype = {
    /**
     * Run Sidebar feature
     * @return {void}
     */
    run: function() {
      var self = this;
      // Detect the click on the open button
      this.$openBtn.click(function() {
        if (!self.$sidebar.hasClass('pushed')) {
          self.openSidebar();
        }
      });
      // Detect the click on close button
      this.$closeBtn.click(function() {
        if (self.$sidebar.hasClass('pushed')) {
          self.closeSidebar();
        }
      });

      var xDown = null;
      var yDown = null;

      $(document).on('touchstart', function(e) {
        if (self.$sidebar.hasClass('pushed')) {
          var firstTouch = (e.touches || e.originalEvent.touches)[0];
          xDown = firstTouch.clientX;
          yDown = firstTouch.clientY;
        }
      }).on('touchmove', function(e) {
        if ((!xDown || !yDown) || !self.$sidebar.hasClass('pushed')) {
          return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            self.closeSidebar();
          }
        }

        xDown = null;
        yDown = null;
      });

      // Detect resize of the windows
      $(window).resize(function() {
        // Check if the window is larger than the minimal medium screen value
        if ($(window).width() > self.mediumScreenWidth) {
          self.resetSidebarPosition();
          self.resetBlogPosition();
        }
        else {
          self.closeSidebar();
        }
      });
    },

    /**
     * Open the sidebar by swiping to the right the sidebar and the blog
     * @return {void}
     */
    openSidebar: function() {
      this.swipeBlogToRight();
      this.swipeSidebarToRight();
    },

    /**
     * Close the sidebar by swiping to the left the sidebar and the blog
     * @return {void}
     */
    closeSidebar: function() {
      this.swipeSidebarToLeft();
      this.swipeBlogToLeft();
    },

    /**
     * Reset sidebar position
     * @return {void}
     */
    resetSidebarPosition: function() {
      this.$sidebar.removeClass('pushed');
    },

    /**
     * Reset blog position
     * @return {void}
     */
    resetBlogPosition: function() {
      this.$blog.removeClass('pushed');
    },

    /**
     * Swipe the sidebar to the right
     * @return {void}
     */
    swipeSidebarToRight: function() {
      var self = this;
      // Check if the sidebar isn't swiped
      // and prevent multiple click on the open button with `.processing` class
      if (!this.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
        // Swipe the sidebar to the right
        this.$sidebar.addClass('processing pushed');
        // add overflow on body to remove horizontal scroll
        this.$body.css('overflow-x', 'hidden');
        setTimeout(function() {
          self.$sidebar.removeClass('processing');
        }, 250);
      }
    },

    /**
     * Swipe the sidebar to the left
     * @return {void}
     */
    swipeSidebarToLeft: function() {
      var self = this;
      // Check if the sidebar is swiped
      // and prevent multiple click on the close button with `.processing` class
      if (this.$sidebar.hasClass('pushed') && !this.$sidebar.hasClass('processing')) {
        // Swipe the sidebar to the left
        this.$sidebar.addClass('processing').removeClass('pushed processing');
        // go back to the default overflow
        setTimeout(function() {
          self.$body.css('overflow-x', 'auto');
        }, 255);
      }
    },

    /**
     * Swipe the blog to the right
     * @return {void}
     */
    swipeBlogToRight: function() {
      var blog = this.$blog;

      // Check if there is enough place for translating `#header .header-title` and `#header .right-picture`
      // regarding the size of `#header .header-title-link`
      // TODO better to use text-overflow on $headerElements.title
      if (this.$header.width() - this.$sidebar.width() - this.$headerElements.titleLink.width() < 130) {
        blog = blog.not(this.$headerElements.title).not(this.$headerElements.rightPicture);
      }

      // Check if the blog isn't swiped
      // and prevent multiple click on the open button with `.processing` class
      if (!blog.hasClass('pushed') && !blog.hasClass('processing')) {
        // Swipe the blog to the right
        blog.addClass('processing pushed');

        setTimeout(function() {
          blog.removeClass('processing');
        }, 250);
      }
    },

    /**
     * Swipe the blog to the left
     * @return {void}
     */
    swipeBlogToLeft: function() {
      var self = this;
      // Check if the blog is swiped
      // and prevent multiple click on the close button with `.processing` class
      if (self.$blog.hasClass('pushed') && !this.$blog.hasClass('processing')) {
        // Swipe the blog to the left
        self.$blog.addClass('processing').removeClass('pushed');

        setTimeout(function() {
          self.$blog.removeClass('processing');
        }, 250);
      }
    }
  };

  $(document).ready(function() {
    var sidebar = new Sidebar();
    sidebar.run();
  });
})(jQuery);
