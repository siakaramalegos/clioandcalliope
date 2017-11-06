'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

// Preprocess sass/scss into css files
gulp.task('sass', function () {
  // TODO: grab multiple with a variation of 'app/scss/**/*.scss' that doesn't grab partials
  return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});
