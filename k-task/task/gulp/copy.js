'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);
    let destjs = path.join(target, url.scripts.assets);

    // Run task
    gulp.task('copy', function() {
        gulp.src([
                path.join(url.source, '**/*'),
                path.join(url.source, '.htaccess'),
                '!' + path.join(url.source, '{**/\_*,**/\_*/**}'),
                '!' + path.join(url.source, url.scripts.root),
                '!' + path.join(url.source, url.styles.root),
                '!' + path.join(url.source, url.layouts.root),
                '!' + path.join(url.source, url.scripts.root, '**/*'),
                '!' + path.join(url.source, url.styles.root, '**/*'),
                '!' + path.join(url.source, url.layouts.root, '**/*'),
                '!' + path.join(url.source, url.ignore.copy)
            ])
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });
}