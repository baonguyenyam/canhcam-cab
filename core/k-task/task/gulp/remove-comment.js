'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import stripCssComments from 'gulp-strip-css-comments';
import stripJsComments from 'gulp-strip-comments';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task

    gulp.task('remove-comment-css', () => {

        return gulp.src([
                path.join(target, '**/*.css'),
                '!' + path.join(target, url.styles.assets, url.concat.namecss_core + '-*.css'),
                '!' + path.join(target, url.styles.assets, url.concat.namecss + '-*.css')
            ])
            .pipe(stripCssComments())
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });
    gulp.task('remove-comment-js', () => {

        return gulp.src([
                path.join(target, '**/*.js'),
                '!' + path.join(target, url.scripts.assets, url.concat.namejs_core + '-*.js'),
                '!' + path.join(target, url.scripts.assets, url.concat.namejs + '-*.js')
            ])
            .pipe(stripJsComments())
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });

}