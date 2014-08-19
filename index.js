var path = require('path');
var injectcode = require('injectcode');
var through = require('through2');
var reMarkdown = /\.(md|markdown|mdown)$/;

/**
  # shazamify

  This is a simple browserify transform that enables markdown files to be
  loaded with a `require` statement and passed through a set of tools to
  make useful markdown slides for
  [shazam](https://github.com/DamonOehlman/shazam)

  ## Usage

  Install:

  ```
  npm install shazamify --save
  ```

  Add as a transform to your `package.json` as per the instructions in the
  [browserify handbook](https://github.com/substack/browserify-handbook#browserifytransform-field).
**/

module.exports = function (file) {
  // if not a markdown file, just pass through
  if (! reMarkdown.test(file)) {
    return through();
  }

  return through(function (buf, enc, next) {
    var stream = this;

    injectcode(buf.toString(), { cwd: path.dirname(file) }, function(err, output) {
      if (err) {
        return next(err);
      }

      stream.push('module.exports = ' + JSON.stringify(output) + ';');
      next();
    });
  });
};
