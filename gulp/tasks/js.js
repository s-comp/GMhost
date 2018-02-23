var gulp = require('gulp');
var include = require("gulp-include");
var babel = require('gulp-babel');
var config = require('../config');
var minify = require('gulp-minify');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV  == 'development';
var isProd = process.env.NODE_ENV  == 'prod';

gulp.task('js', function () {
	gulp.src(config.src.js+'**/*.js')
		.pipe(include())
		.on('error', function() {
			notify("Javascript include error");
		})
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.dest.js))
		.pipe(reload({stream: true}));
});

gulp.task('js:watch', function() {
	gulp.watch(config.src.js+'*', ['js']);
});

gulp.task('jslint', function () {
	gulp.src([config.src.js+'**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format('codeframe'));
});

gulp.task('jslint:watch', function() {
	gulp.watch(config.src.js+'*', ['jslint']);
});
