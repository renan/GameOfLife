
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['build/js/*.js'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
