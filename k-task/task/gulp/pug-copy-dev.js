'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';
import yaml from 'js-yaml';
import rename from "gulp-rename"

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join('tmppug');
	let destjade = path.join(target);
	let dataPath = path.join(url.src, url.data);
	let dataPathJS = path.join(url.src, url.dataJS);


	// Run task
	gulp.task('pug-rename-dev', function () {
		gulp.src([
			path.join('tmp', 'template', '**/index.html'),
			'!' + path.join(url.src2, '{**/\_*,**/\_*/**}')
		])
			.pipe(rename(function (path) {
				// var a = path.dirname.replace('/', '-')
				var a = path.dirname.replace(/\\/g, "-").replace(/\//g, "-");
				path.dirname = "/";
				path.basename += "-" + a;
				path.extname = ".html"
			}))
			.pipe(plugins.changed('tmp'))
			.pipe(gulp.dest('tmp'));
	});
	// Run task
	gulp.task('pug-copy-dev', function () {
		gulp.src([
			path.join(url.src2, '**/index.pug'),
			'!' + path.join(url.src2, '{**/\_*,**/\_*/**}')
		])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});
	gulp.task('pug-insert-dev', ['pug-copy-dev'], function () {
		fs.readdirSync('./tmppug/').forEach(f => {
			var folder = f
			fs.readdirSync('./tmppug/' + folder).forEach(fl => {
				var getfile = './tmppug/' + folder + '/' + fl
				var data = fs.readFileSync(getfile+ '/index.pug').toString().split("\n");
				if (folder === 'header') {
					data.splice(0, 0, "extends ../../../core/templates/_layout/layout.pug\nblock header");
				} else if (folder === 'footer') {
					data.splice(0, 0, "extends ../../../core/templates/_layout/layout.pug\nblock footer");
				} else {
					data.splice(0, 0, "extends ../../../core/templates/_layout/layout.pug\nblock body");
				}
				var text = data.join("\n\t");
				fs.writeFile(getfile+ '/index.pug', text, function (err) {
					if (err) {
						throw err;
					} else {
						// console.log(data);
					}
				});
			})
		})

	});




}
