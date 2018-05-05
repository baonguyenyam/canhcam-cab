'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target, url.styles.assets);

    // Run task
    gulp.task('css', () => {


        gulp.src([
                path.join(url.source, url.styles.css, '**/*.css'),
                '!' + path.join(url.source, '{**/\_*,**/\_*/**}'),
                '!' + path.join(url.source, url.styles.css, url.ignore.css)
            ])
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream({
                match: '**/*.css'
            }));


    });
}