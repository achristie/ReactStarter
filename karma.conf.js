// Karma configuration
// Generated on Sun Jul 10 2016 20:50:02 GMT-0400 (Eastern Daylight Time)
const webpackEnv = { test: true };
const webpackConfig = require('./webpack.config')(webpackEnv);
const specGlob = 'src/**/*.spec.js';
const srcGlob = 'src/**/*.spec.js';
// this is i think a karma bug..
//const srcGlob = 'src/**/!(*.spec|*.stub).js';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [specGlob, srcGlob],
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
    preprocessors: {
      [specGlob]: ['webpack'],
      [srcGlob]: ['webpack']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'json', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' },
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
