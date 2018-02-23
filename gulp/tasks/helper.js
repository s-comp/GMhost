var gulp = require('gulp');
var config = require('../config');
var notify = require('gulp-notify');
var del = require('del');

gulp.task('clean', function() {
	return del( 'build' );
});
