# gulp-js-string

A [gulp](https://github.com/gulpjs/gulp) plugin for exporting contents as string.

## Installation

```
$ npm install --save-dev gulp-js-string
```

## Usage

```javascript
var jsString = require('gulp-js-string');

gulp.src('./views/*.bhtml')
    .pipe(jsString())
    .pipe(gulp.dest('./dist'));
```

index.html

```html
<p>meow...meow...</p>
```

index.js

```javascript
module.exports = '<p>meow...meow...</p>';
```

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
