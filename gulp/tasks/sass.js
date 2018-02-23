var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var mqpacker = require("css-mqpacker");
var config = require('../config');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var cssimport = require("gulp-cssimport");
var fs = require('fs');

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV  == 'development';
var isProd = process.env.NODE_ENV  == 'prod';

gulp.task('sass', function() {
	var processors = [
		autoprefixer({browsers: ['last 15 versions'], cascade: false}),
		mqpacker({
			sort: true
		})
	];

    return gulp.src(config.src.sass + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError({
            title: 'Sass Error!',
            message: '<%= error.message %>'
        })))
        .pipe(cssimport())
        .pipe(postcss(processors))
        .pipe(cleanCSS())
        .pipe(gulpIf(isDev, sourcemaps.write('./')))
        .pipe(gulp.dest(config.dest.css));
});


gulp.task('sass:watch', function() {
	gulp.watch(config.src.sass + '/**/*', ['sass']);
});
