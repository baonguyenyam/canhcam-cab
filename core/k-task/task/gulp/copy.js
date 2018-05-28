'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';


module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join(target);
	let destimg = path.join(target, 'img');
	let destfonts = path.join(target, 'fonts');
	let destwebfonts = path.join(target, 'webfonts');
	let destcss = path.join(target, 'css');

	// Run task
	gulp.task('copy', setgulp.production ? ['copy-build'] : ['copy-img', 'copy-fonts', 'copy-webfonts', 'copy-css']);

	gulp.task('copy-img', function () {
		gulp.src([
			path.join(url.source, 'img', '**/*'),
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destimg))
	});
	gulp.task('copy-webfonts', function () {
		gulp.src([
			path.join(url.source, 'webfonts', '**/*'),
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destwebfonts))
	});
	gulp.task('copy-fonts', function () {
		gulp.src([
			path.join(url.source, 'fonts', '**/*'),
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destfonts))
	});
	gulp.task('copy-css', function () {
		gulp.src([
			path.join(url.source, 'css', '**/*'),
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destcss))
	});
	gulp.task('copy-build', function () {
		gulp.src([
			path.join(url.source, '**/*'),
			path.join(url.source, '.htaccess'),
			'!' + path.join(url.source, 'bower_components'),
			'!' + path.join(url.source, 'bower_components', '**/*'),
			'!' + path.join(url.source, 'node_modules'),
			'!' + path.join(url.source, 'node_modules', '**/*'),
			'!' + path.join(url.source, 'k-task'),
			'!' + path.join(url.source, 'k-task', '**/*'),
			'!' + path.join(url.source, 'lib'),
			'!' + path.join(url.source, 'lib', '**/*'),
			'!' + path.join(url.source, 'tmp'),
			'!' + path.join(url.source, 'tmp', '**/*'),
			'!' + path.join(url.source, 'dist'),
			'!' + path.join(url.source, 'dist', '**/*'),
			'!' + path.join(url.source, 'bower.json'),
			'!' + path.join(url.source, '*.json'),
			'!' + path.join(url.source, '{**/\_*,**/\_*/**}'),
			'!' + path.join(url.source, url.scripts.root),
			'!' + path.join(url.source, url.styles.root),
			'!' + path.join(url.source, url.layouts.root),
			'!' + path.join(url.source, url.scripts.root, '**/*'),
			'!' + path.join(url.source, url.styles.root, '**/*'),
			'!' + path.join(url.source, url.layouts.root, '**/*'),
			'!' + path.join(url.source, url.ignore.copy)
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
	});
}
