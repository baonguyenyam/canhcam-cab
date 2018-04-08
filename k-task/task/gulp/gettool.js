'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join('tmptool');

    // Run task
	gulp.task('gettool', function() {
        gulp.src([
                path.join('_tool', '**/*')
            ])
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });
}
