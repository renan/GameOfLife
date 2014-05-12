var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('default', ['coffee']);

gulp.task('coffee', function() {
  return gulp.src('src/*.coffee', { read: false })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename('src.js'))
    .pipe(gulp.dest('./build/js'));
});
