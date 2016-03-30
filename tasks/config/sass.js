module.exports = function(grunt) {
  grunt.config.set('sass', {
    // Compile `tranquilpeak.scss` file into `tranquilpeak.css`
    dev: {
      options: {
        sourceMap: false
      },
      files: {
        'static/css/tranquilpeak.css': 'src/scss/tranquilpeak.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};
