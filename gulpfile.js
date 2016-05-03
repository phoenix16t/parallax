var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./app/dist/'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src('./app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/dist/'));
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('js', ['lint', 'scripts'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('serve', ['sass', 'lint', 'scripts'], function() {
    browserSync.init({
        server: "./app"
    });
});

gulp.task('watch', function() {

  watch('app/js/*.js', function() {
    gulp.start('js');
  });

  watch('./app/scss/*.scss', function() {
    gulp.start('sass');
  });

  watch('./app/*.html', function() {
    gulp.start('reload');
  });
});

gulp.task('default', ['serve', 'watch']);
// gulp.task('build', ['sass', 'lint', 'scripts', 'watch']);
