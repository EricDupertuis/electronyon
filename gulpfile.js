var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var cssnano = require('gulp-cssnano');
var filesize = require('gulp-filesize');
var imagemin = require('gulp-imagemin');
var jslint = require('gulp-jslint');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pngquant = require('imagemin-pngquant');
var addsrc = require('gulp-add-src');
var browserSync = require('browser-sync').create();

gulp.task('scss', function () {
    gulp.src('./assets/src/scss/main.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csslint())
        //.pipe(csslint.reporter())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/dist/css/'))
        .pipe(browserSync.stream())
        .pipe(filesize());
});

gulp.task('js', function () {
    gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.js', './assets/src/js/**/*.js'])
        .pipe(plumber())
        .pipe(concat('main.js'))
        //.pipe(jslint())
        .pipe(uglify())
        .pipe(gulp.dest('./assets/dist/js/'))
        .pipe(filesize())
        .pipe(browserSync.stream());
});

gulp.task('img', function () {
    gulp.src('./assets/src/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('default', function () {
    gulp.watch('./assets/src/images/**/*', ['img']);
    gulp.watch('./assets/src/scss/**/*', ['scss']);
    gulp.watch('./assets/src/js/*', ['js']);
});

gulp.task('serve', ['scss'], function() {
    browserSync.init({
        server: "."
    });

    gulp.watch('./assets/src/images/**/*', ['img']);
    gulp.watch('./assets/src/scss/**/*', ['scss']);
    gulp.watch('./assets/src/js/*', ['js']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});