'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join('_tool/templates');
    let destjs = path.join(target, url.scripts.assets);

    // Run task
	gulp.task('copytool', function() {
        gulp.src([
                path.join(url.tmp, '**/*')
            ])
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });
}
