// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

//Set the chrome_bin env here for the pod
process.env.CHROME_BIN = require('puppeteer').executablePath()
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [

    ],
    preprocessors: {

    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul']
      : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
        ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
        }
    }
    // browsers: ['ChromeHeadless'],
    //     flags: [
    //       '--no-sandbox',
    //       '--remote-debugging-port=9222',
    //       '--enable-logging',
    //       '--v=1',
    //       '--disable-background-timer-throttling',
    //       '--disable-renderer-backgrounding',
    //       '--disable-extensions'
    //    ],
    // singleRun: false
  });
};
