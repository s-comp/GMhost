var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var config = require('../config');

gulp.task('watch', [
	'sprite:watch',
	'sass:watch',
	'copy:watch',
	'html:watch',
	'js:watch'
]);

gulp.task('default', function (cb) {
	gulpSequence(
		['clean'],
		['html', 'sprite', 'copy', 'js', 'sass'],
		['server', 'watch'])(cb)
});
gulp.task('build', ['html','sprite','copy','js', 'sass'], function() {});
