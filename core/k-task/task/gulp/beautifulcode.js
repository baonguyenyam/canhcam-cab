'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import cssbeautify from 'gulp-cssbeautify';
import beautify from 'gulp-beautify';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task

    gulp.task('beautiful-css', () => {

        return gulp.src([
                path.join(target, '**/*.css'),
                '!' + path.join(target, url.styles.assets, url.concat.namecss_core + '-*.css'),
                '!' + path.join(target, url.styles.assets, url.concat.namecss + '-*.css')
            ])
            .pipe(cssbeautify())
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });
    gulp.task('beautiful-js', () => {

        return gulp.src([
                path.join(target, '**/*.js'),
                '!' + path.join(target, url.scripts.assets, url.concat.namejs_core + '-*.js'),
                '!' + path.join(target, url.scripts.assets, url.concat.namejs + '-*.js')
            ])
            .pipe(beautify({ indent_size: 2 }))
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });

}