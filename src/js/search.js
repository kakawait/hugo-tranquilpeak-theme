(function($) {
  'use strict';
  $(function() {
    // launch feature only if there is an Algolia index available
    if(typeof algoliaIndex !== 'undefined' &&
       $('#search-result-wrp').length > 0) {
      window.searchController =
        new SearchController(algoliaIndex, $('#search-result-wrp'));
      var params = parseStringQueries();
      if(params.query) {
        var $form = $('#openat-lookup-form');
        if($form.length > 0)
          $form.find('input[name=query]').val(params.query)
        searchController.$searchWrp.hide();
        searchController.search(params.query, function() {
          searchController.$searchWrp.show();
        });
      }
      window.onpopstate = function() {
        params = parseStringQueries();
        if(params.query) {
          var $form = $('#openat-lookup-form');
          if($form.length > 0)
            $form.find('input[name=query]').val(params.query)
          searchController.search(params.query);
        }
      }
    }
  });

  /**
   * Search modal with Algolia
   * @constructor
   */
  window.SearchController = function(algoliaIndex, $searchWrp) {
    var self = this;
    self.$searchWrp = $searchWrp;
    self.$results = self.$searchWrp.find('.results');
    self.$noResults = self.$searchWrp.find('.no-result');
    self.$resultsCount = self.$searchWrp.find('.results-count');
    self.algolia = algoliaIndex;
    
    self.$noResults.hide()
  };

  SearchController.prototype = {

    /**
     * Search with Algolia API and display results
     * @param {String} search
     * @returns {void}
     */
    search: function(search, callback) {
      var self = this;
      this.algolia.search(search, function(err, content) {
        if (!err) {
          self.showResults(content.hits);
          self.showResultsCount(content.nbHits);
          if(callback) {
            callback(content);
          }
        } else {
          console.log("search error", err);
        }
      });
    },

    /**
     * Display results
     * @param {Array} posts
     * @returns {void}
     */
    showResults: function(posts) {
      var html = '';
      posts.forEach(function(post) {
        var lang = window.navigator.userLanguage || window.navigator.language || post.lang;

        html += '<div class="media">';
        if (post.thumbnailImageUrl) {
          html += '<div class="media-left">';
          html += '<a class="link-unstyled" href="' + (post.link || post.permalink) + '">';
          html += '<img class="media-image" ' +
            'src="/' + post.thumbnailImageUrl + '" ' +
            'width="90" height="90"/>';
          html += '</a>';
          html += '</div>';
        }

        html += '<div class="media-body">';
        html += '<a class="link-unstyled" href="' + (post.link || post.permalink) + '">';
        html += '<h3 class="media-heading">' + post.title + '</h3>';
        html += '</a>';
        html += '<span class="media-meta">';
        html += '<span class="media-date text-small">';
        html += moment(post.date).locale(lang).format('ll');
        html += '</span>';
        html += '</span>';
        html += '<div class="media-content hide-xs font-merryweather">' + post.excerpt + '</div>';
        html += '</div>';
        html += '<div style="clear:both;"></div>';
        html += '<hr>';
        html += '</div>';
      });
      this.$results.html(html);
    },
    /**
     * Display messages and counts of results
     * @param {Number} count
     * @returns {void}
     */
    showResultsCount: function(count) {
      var string = '';
      if (count < 1) {
        string = this.$resultsCount.data('message-zero');
        this.$noResults.show();
      }
      else if (count === 1) {
        string = this.$resultsCount.data('message-one');
        this.$noResults.hide();
      }
      else if (count > 1) {
        string = this.$resultsCount.data('message-other').replace(/\{n\}/, count);
        this.$noResults.hide();
      }
      this.$resultsCount.html(string);
    }
  };
  
})(jQuery);
