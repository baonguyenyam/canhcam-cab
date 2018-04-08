'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';

module.exports = function (gulp, setgulp, plugins, config, target, browserSync) {
	let url = config;
	let dest = path.join(target, url.styles.assets);

	// Run task
	gulp.task('sass-dev', () => {


		var autoprefixerOpts = {
			browsers: [
				'last 2 versions',
				'iOS >= 7',
				'Android >= 4',
				'Explorer >= 10',
				'ExplorerMobile >= 11'
			],
			cascade: false
		};

		gulp.src([
			path.join(url.src2, '**/index.{sass,scss}'),
			'!' + path.join(url.src2, '{**/\_*,**/\_*/**}'),
			'!' + path.join(url.src2, url.concat.ACTIVE_CONCAT ? url.ignore.sassactiveconcat : url.ignore.sass),
			// setgulp.production ? '!' + path.join(url.source, url.styles.sass, '**/viensoi-dev.sass') : path.join()
		])
			.pipe(plugins.plumber())
			.pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
			.pipe(plugins.sass({
				outputStyle: 'expanded',
				precision: 10,
				includePaths: [
					// 'node_modules/ionic-angular/',
					// 'node_modules/ionicons/dist/scss',
					path.join(url.source, url.styles.sass)
				]
			}).on('error', function (err) {
				plugins.util.log(err);
			})
				.on('error', plugins.notify.onError(config.defaultNotification)))
			.pipe(concat('main.css'))
			.pipe(plugins.postcss([autoprefixer(autoprefixerOpts)]))
			.pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
			.pipe(gulpif(!setgulp.production, plugins.sourcemaps.write('./')))
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest))
			.pipe(browserSync.stream({
				match: '**/*.css'
			}));


	});
}
