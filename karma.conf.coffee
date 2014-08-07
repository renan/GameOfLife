
module.exports = (config) ->
  config.set
    frameworks: ['jasmine', 'browserify']
    files: [
      'src/**/*.coffee'
      'test/**/*.coffee'
    ]
    reporters: ['progress', 'coverage']
    preprocessors:
      'src/**/*.coffee': ['browserify']
      'test/**/*.coffee': ['browserify']
    port: 9876
    colors: true
    browsers: ['Chrome']
    singleRun: true
    browserify:
      transform: ['coffeeify', 'istanbulify']
      extensions: ['.coffee']
      debug: true
    coverageReporter:
      type: 'text'
      subdir: '.'
      dir: 'build/'
