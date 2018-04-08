'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import angularFilesort from 'gulp-angular-filesort';

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join(target);
	let destconfig = path.join(target, url.config);
	let destjs = path.join(target, url.scripts.assets);

	// Run task
	gulp.task('babel-concat-dev', () => {
		return gulp.src([
			path.join(url.src2, '**/index.js'),
			'!' + path.join(url.src2, '{**/\_*,**/\_*/**}')
		])
			// .pipe(angularFilesort())
			.pipe(concat(url.concat.babelconcat + '.js'))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.babel({
				presets: ['es2015']
			}))
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
	});

};
