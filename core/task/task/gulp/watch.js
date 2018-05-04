'use strict';

import path from 'path';
import runSequence from 'run-sequence';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('watch', () => {
        if (!setgulp.production) {

            // Concat
            gulp.watch([
                path.join('./task/config.yml')
            ], function() {
                runSequence('k-task', 'inject');
            })

            // Styles
            gulp.watch([
				path.join(url.source, url.styles.assets, '**/*.css')
            ], ['css']);

            gulp.watch([
				path.join(url.source, url.src2, '**/*.{sass,scss}')
            ], function() {
                runSequence('sass', 'inject');
            })

            // Scripts
            gulp.watch([
				path.join(url.source, url.scripts.javascript, '**/*.js'),
				path.join(url.source, url.src2, '**/*.js')
            ], ['babel', 'babel-concat'])

            // Templates
            gulp.watch([
				path.join(url.source, '**/*.pug')
            ], function() {
                runSequence('pug', 'inject');
            })

            // Copy
            // gulp.watch([
			// 	'!' + path.join(url.source, 'tmp'),
			// 	'!' + path.join(url.source, 'tmp', '**/*'),
			// 	path.join(url.source, '**/*.{svg,jpg,jpeg,png,gif,txt,bmp,md,json,yml,yaml,css,html,js,eot,svg,ttf,woff,woff2}'),
            // ], ['copy']);

            // All other files
            gulp.watch([path.join(url.tmp, '**/*'),
                '!' + path.join(url.tmp, '**/*.{css,map,html,js}')
            ]).on('change', browserSync.reload);
        }
    });
}
