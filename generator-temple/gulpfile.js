'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('./css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['sass', 'browserSync'], function (){
  gulp.watch('./css/**/*.scss', ['sass']); 
  gulp.watch('./*.html', browserSync.reload); 
  gulp.watch('./js/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    startPath:'./<%= campaign_name %>/<%= banner_size %>',
    server:{
        baseDir: '../../'
    }
  })
})

gulp.task( 'default', [ 'watch' ] );