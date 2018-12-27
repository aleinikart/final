var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('html:build', function () {
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function(){
    return gulp.src('app/sass/common.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('common.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function(){
    browserSync({
      server: {
        baseDir: 'dist',
        index: "index.html"
      },
      notify: false
    });
});

gulp.task('watch', ['browser-sync', 'html:build', 'sass'], function(){
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['html:build'], browserSync.reload({stream: true}));
    gulp.watch('dist/*.html', browserSync.reload({stream: true}));
});
