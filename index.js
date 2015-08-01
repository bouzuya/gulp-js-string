var gutil = require('gulp-util');
var jsStringEscape = require('js-string-escape');
var through = require('through2');

module.exports = function() {
  var newError = function(e) {
    return new gutil.PluginError('gulp-js-string', e);
  };

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null ,file);
    }

    if (file.isStream()) {
      return callback(newError('Stream is not supported.'))
    }

    try {
      // convert to vinyl 0.5.x
      var f = new gutil.File(file);
      var string = "'" + jsStringEscape(f.contents.toString(encoding)) + "'";
      var script = "module.exports = " + string + ";";
      f.contents = new Buffer(script);
      f.extname = '.js';
      return callback(null, f);
    } catch (err) {
      return callback(newError(err));
    }
  });
};
