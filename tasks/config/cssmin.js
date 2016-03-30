var randToken = require('rand-token');

module.exports = function(grunt) {
  grunt.config.set('cssmin', {
    // Minify `style.css` file into `style.min.css`
    prod: {
      files: [{
        expand: true,
        cwd: 'static/css',
        src: ['style.css'],
        dest: 'static/css',
        ext: '-' + randToken.generate(60).toLocaleLowerCase() + '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
