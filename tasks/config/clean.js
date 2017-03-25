module.exports = function(grunt) {
  grunt.config.set('clean', {
    // Delete the `assets` folder
    build: ['static/css','static/images','static/js']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
