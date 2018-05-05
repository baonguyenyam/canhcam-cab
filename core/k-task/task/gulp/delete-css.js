'use strict';

import path from 'path';
import clean from 'gulp-clean';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target, url.styles.assets);

    // Run task

    gulp.task('delete-css', () => {

        return gulp.src([
                path.join(target, url.styles.assets, '*.*'),
                '!' + path.join(target, url.styles.assets, '*-*.min.css'),
                path.join(target, url.styles.assets, '**/*.*'),
                '!' + path.join(target, url.styles.assets, '**/*-*.min.css'),
                '!' + path.join(target, url.styles.assets, url.ignore.inject)
            ], {
                read: false
            })
            .pipe(clean({
                force: true
            }))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });

}