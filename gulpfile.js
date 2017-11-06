'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // compiles scss to css
var browserSync = require('browser-sync').create(); // hot reload
var useref = require('gulp-useref'); // concatenates files
var gulpIf = require('gulp-if'); // checks file type
var uglify = require('gulp-uglify'); // minimizes JS
var cssnano = require('gulp-cssnano'); // minimizes css
var imagemin = require('gulp-imagemin'); // optimizes images
var cache = require('gulp-cache'); // caches since images esp slow
var del = require('del'); // deletes files
var runSequence = require('run-sequence'); // run tasks in sequence

// Setting up browserSync to automatically reload on file changes
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app',
    }
  })
});

// Preprocess sass/scss into css files and stream to browser
gulp.task('sass', function () {
  // TODO: grab multiple with a variation of 'app/scss/**/*.scss' that doesn't grab partials
  return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true,
    }))
});

// Grab html files and put into build folder
gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    // Uglify only JavaScript files
    .pipe(gulpIf('*.js', uglify()))
    // Minify only CSS files
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'))
});

// Optimize images and cache them while doing so
gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('build/images'))
});

// Delete build files
gulp.task('clean:build', function () {
  return del.sync('build');
});

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

gulp.task('build', function (callback) {
  runSequence(
    'clean:build',
    ['sass', 'useref', 'images'],
    callback
  )
});

// Complete browserSync and sass task before running watch functions
// Also add reload for changes to html files
// TODO: add javascript files if added later and see https://css-tricks.com/gulp-for-beginners/ script concat section
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  // gulp.watch('app/ja/**/*.js', browserSync.reload);
});

