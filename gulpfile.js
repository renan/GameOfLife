var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var karma = require('gulp-karma');

gulp.task('default', ['js-src']);

var coffee = function(dir) {
  return gulp.src(dir + '/*.coffee', { read: false })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee'],
      debug: true
    }))
    .pipe(rename(dir + '.js'))
    .pipe(gulp.dest('./build/js'));
};

gulp.task('js-src', function() {
  return coffee('src');
});

gulp.task('js-test', function() {
  return coffee('test');
});

gulp.task('test', ['default', 'js-test'], function() {
  return gulp.src('build/js/*.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
