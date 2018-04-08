'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';
import yaml from 'js-yaml';
import rename from "gulp-rename"
import insert from 'gulp-insert';

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join('tmppug');
	let destjade = path.join(target);
	let dataPath = path.join(url.src, url.data);
	let dataPathJS = path.join(url.src, url.dataJS);


	// Run task
	gulp.task('pug-copy-dev', function () {
		gulp.src([
			path.join(url.src2, '**/index.pug'),
			'!' + path.join(url.src2, '{**/\_*,**/\_*/**}')
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});

}
