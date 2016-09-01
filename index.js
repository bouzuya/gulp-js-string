var gutil = require('gulp-util');
var jsStringEscape = require('js-string-escape');
var through = require('through2');

module.exports = function(format) {
  var newError = function(e) {
    return new gutil.PluginError('gulp-js-string', e);
  };

  format = format || function(escapedString, _file) {
    return "module.exports = '" + escapedString + "';";
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
      var escapedString = jsStringEscape(f.contents.toString(encoding));
      var formatted = format(escapedString, f);
      f.contents = new Buffer(formatted);
      f.extname = '.js';
      return callback(null, f);
    } catch (err) {
      return callback(newError(err));
    }
  });
};
