
module.exports = function(grunt) {
  grunt.config.set('bower', {
    // Copy all needed files by types
    dev: {
      /* eslint-disable camelcase */
      dest: 'static/images',
      js_dest: 'static/js',
      css_dest: 'static/css',
      fonts_dest: 'static/fonts',
      /* eslint-enable camelcase */
      options: {
        expand: false,
        keepExpandedHierarchy: false,
        packageSpecific: {
          fancybox: {
            files: [
              'source/blank.gif',
              'source/fancybox_loading.gif',
              'source/fancybox_loading@2x.gif',
              'source/fancybox_overlay.png',
              'source/fancybox_sprite.png',
              'source/fancybox_sprite@2x.png',
              'source/jquery.fancybox.js',
              'source/jquery.fancybox.css',
              'source/helpers/jquery.fancybox-thumbs.css',
              'source/helpers/jquery.fancybox-thumbs.js'
            ]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower');
};
