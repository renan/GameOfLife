
module.exports = (config) ->
  config.set
    frameworks: ['jasmine', 'browserify']
    files: [
      'src/**/*.coffee'
      'test/**/*.coffee'
    ]
    reporters: ['progress']
    preprocessors:
      'src/**/*.coffee': ['browserify']
      'test/**/*.coffee': ['browserify']
    port: 9876
    colors: true
    browsers: ['PhantomJS']
    singleRun: true
    browserify:
      transform: ['coffeeify']
      extensions: ['.coffee']
      debug: true
