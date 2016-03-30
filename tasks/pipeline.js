// Js files to inject in `layouts/partials/script.html`
var tranquilpeakJsFilesToInject = [
  'jquery.js',
  'jquery.fancybox.js',
  'jquery.fancybox-thumbs.js',
  'tranquilpeak.js',
  'highlight.pack.js'
];

// Css files to inject in `layouts/partials/head.html`
var tranquilpeakCssFilesToInject = [
  'font-awesome.css',
  'jquery.fancybox.css',
  'jquery.fancybox-thumbs.css',
  'tranquilpeak.css'
];

module.exports.tranquilpeakCssFilesToInject = tranquilpeakCssFilesToInject.map(function(path) {
  return 'static/css/' + path;
});

module.exports.tranquilpeakJsFilesToInject = tranquilpeakJsFilesToInject.map(function(path) {
  return 'static/js/' + path;
});
