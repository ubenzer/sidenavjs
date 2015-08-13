"use strict";
module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["browserify", "fixture", "mocha", "should-promised", "should"],
    files: [
      "test/fixtures/**",
      "test/unit/**/*.js"
    ],
    exclude: [],
    preprocessors: {
      "test/**/*.js": ["browserify"],
      "lib/*.js": ["coverage"],
      "**/*.html": ["html2js"],
    },
    browserify: {
      debug: true
    },
    reporters: ["progress", "coverage"],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false
  })
}
