'use strict';

import path from 'path';
import del from 'del';
import concat from 'gulp-concat';
import through from 'through2';
import concatCss from 'gulp-concat-css';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import minifyCss from 'gulp-csso';
import minifyJS from 'gulp-uglify';
import rename from 'gulp-rename';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
	let dest = path.join('_tool');
	let destjs = path.join('_tool', 'views');
	let destcss = path.join('_tool', 'views');

    // Run task

	gulp.task('concattool', function() {
        gulp.src([
			'_tool/vendor/js/jquery-3.2.1.slim.min.js',
			'_tool/vendor/js/popper.min.js',
			'_tool/vendor/js/bootstrap.min.js',
			'_tool/vendor/js/sortable.min.js',
			'_tool/vendor/js/bootstrap-colorpicker.min.js',
			'_tool/vendor/js/jquery-quickedit.js',
			'_tool/vendor/js/typeahead.jquery.min.js',
			'_tool/vendor/js/select2.full.min.js',
			'_tool/vendor/js/bootstrap-tour.min.js',
			'_tool/vendor/js/offline.min.js',
			'_tool/vendor/js/pace.min.js',
			'_tool/vendor/js/keymaster.js'
		])
			.pipe(concat(url.concat.namejs_core + '.js'))
			.pipe(minifyJS())
			.pipe(rename({
				suffix: '.min'
			}))
            .pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
			
        gulp.src([
			'_tool/vendor/css/bootstrap.min.css',
		])
			.pipe(concatCss(url.concat.namecss_core + '.css', {
				includePaths: '',
				rebaseUrls: false,
				inlineImports: false
			}))
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destcss));
		
        gulp.src([
			'_tool/vendor/css/font-awesome.min.css',
			'_tool/vendor/css/bootstrap-colorpicker.min.css',
			'_tool/vendor/css/select2.min.css',
			'_tool/vendor/css/bootstrap-tour.min.css',
			'_tool/vendor/css/offline-language-vietnam.css',
			'_tool/vendor/css/offline-theme-chrome.css',
			'_tool/vendor/css/pace-theme-mac-osx.css',
			'_tool/css/main.css'
		])
			.pipe(concatCss(url.concat.babelconcat + '.css', {
				includePaths: '',
				rebaseUrls: false,
				inlineImports: false
			}))
			.pipe(minifyCss())
			.pipe(rename({
				suffix: '.min'
			}))
            .pipe(plugins.changed(dest))
			.pipe(gulp.dest(destcss));
		
		gulp.src([
			'_tool/js/core.js',
			'_tool/js/main.js',
			'_tool/js/dab.js',
			'_tool/js/key.js',
			'_tool/js/tour.js',
		])
			.pipe(plugins.babel({
				presets: ['es2015']
			}))
			.pipe(plugins.changed(dest))
			.pipe(concat(url.concat.babelconcat + '.js'))
			.pipe(minifyJS())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));

    });

}