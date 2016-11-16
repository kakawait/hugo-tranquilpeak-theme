module.exports = function(grunt) {
  grunt.config.set('eslint', {
    eslint: {
      eslint: {
        target: ['/Volumes/diskE/Users/t5e/Projects/blog/hugo-tranquilpeak-theme/src/js/about.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-eslint');
};