'use strict';

import path from 'path';
import runSequence from 'run-sequence';

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	// Run task
	gulp.task('watch', () => {

		// Styles
		gulp.watch([
			path.join(url.source, url.styles.assets, '**/*.css')
		], ['css']);

		gulp.watch([
			path.join(url.source, url.src2, '**/*.{sass,scss}')
		], function () {
			runSequence('sass', 'inject');
		})

		// Scripts
		gulp.watch([
			path.join(url.source, url.scripts.javascript, '**/*.js'),
			path.join(url.source, url.src2, '**/*.js')
		], ['babel', 'babel-concat'])

		// Templates
		gulp.watch([
			path.join(url.source, url.layouts.jade, '**/*.pug'),
			path.join(url.source, url.src2, '**/*.pug')
		], function () {
			runSequence('pug', 'inject');
		})

		// Copy
		gulp.watch([
			'!' + path.join(url.source, 'tmp'),
			'!' + path.join(url.source, 'tmp', '**/*'),
			path.join(url.source, 'img', '**/*'),
			path.join(url.source, url.styles.assets, '**/*'),
			path.join(url.source, url.scripts.javascript, '**/*'),
			path.join(url.source, url.layouts.jade, '**/*'),
			path.join(url.source, url.src2, '**/*'),
		], ['copy']);

		// All other files
		gulp.watch([path.join(url.tmp, '**/*'),
		'!' + path.join(url.tmp, '**/*.{css,map,html,js}')
		]).on('change', browserSync.reload);
	});
}
