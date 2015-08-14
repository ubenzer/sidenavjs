"use strict";

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var eslint = require("gulp-eslint");
var stylus = require("gulp-stylus");
var uglify = require("gulp-uglify");
var source = require("vinyl-source-stream");
var gutil = require("gulp-util");
var del = require("del");

gulp.task("default", ["serve"]);

gulp.task("stylus-with-fail", ["clean"], function build() {
  gulp.src("src/**/*.styl")
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("build-browserify-standalone", ["clean", "eslint-with-fail"], function build() {
  var b = browserify({
    entries: "src/sidenav.js",
    standalone: "Sidenav"
  });
  return b.bundle()
      .on("error", gutil.log)
    .pipe(source("sidenav.min.js"))
    .pipe(buffer())
    .pipe(uglify())
      .on("error", gutil.log)
    .pipe(gulp.dest("dist"));
});

gulp.task("dist", [
  "clean",
  "stylus-with-fail",
  "build-browserify-standalone"
]);

gulp.task("eslint", function() {
  return gulp.src(["src/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("eslint-with-fail", function() {
  return gulp.src(["src/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task("clean", function(cb) {
  del(["dist/**/*"], cb);
});

// gulp.task("test")


// serve
// styls
// change watch reload host

// dist
// eslint + fail
// stylus + fail
// uglify, cssmin
// test

// test
// eslint + fail
// stylus + fail
// run tests
