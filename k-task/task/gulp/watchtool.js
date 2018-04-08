'use strict';

import path from 'path';
import runSequence from 'run-sequence';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
	gulp.task('watchtool', () => {
        if (!setgulp.production) {


            // Styles
            gulp.watch([
				path.join('_tool', '**/*.*')
            ], ['gettool']);

            // All other files
            gulp.watch([path.join('tmptool', '**/*.*'),
                // '!' + path.join('tmptool', '**/*.{css,map,html,js}')
            ]).on('change', browserSync.reload);
        }
    });
}
