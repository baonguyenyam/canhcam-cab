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
			'_tool/js/jquery-3.2.1.slim.min.js',
			'_tool/js/popper.min.js',
			'_tool/js/bootstrap.min.js',
			'_tool/js/sortable.min.js',
			'_tool/js/bootstrap-colorpicker.min.js',
			'_tool/js/jquery-quickedit.js',
			'_tool/js/typeahead.jquery.min.js',
			'_tool/js/select2.full.min.js',
			'_tool/js/bootstrap-tour.min.js',
			'_tool/js/keymaster.js'
		])
			.pipe(concat(url.concat.namejs_core + '.js'))
			.pipe(minifyJS())
			.pipe(rename({
				suffix: '.min'
			}))
            .pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
			
        gulp.src([
			'_tool/css/bootstrap.min.css',
		])
		.pipe(concatCss(url.concat.namecss_core + '.css'))
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(plugins.changed(dest))
		.pipe(gulp.dest(destcss));
		
        gulp.src([
			'_tool/css/font-awesome.min.css',
			'_tool/css/bootstrap-colorpicker.min.css',
			'_tool/css/select2.min.css',
			'_tool/css/bootstrap-tour.min.css',
			'_tool/css/main.css'
		])
			.pipe(concatCss(url.concat.babelconcat + '.css'))
			.pipe(minifyCss())
			.pipe(rename({
				suffix: '.min'
			}))
            .pipe(plugins.changed(dest))
			.pipe(gulp.dest(destcss));
		
		gulp.src([
			'_tool/js/core.js',
			'_tool/js/main.js',
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