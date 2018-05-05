'use strict';

import path from 'path';
import del from 'del';
import concat from 'gulp-concat';
import through from 'through2';
import concatCss from 'gulp-concat-css';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);
    let destjs = path.join(target, url.scripts.assets);
    let destcss = path.join(target, url.styles.assets);

    // Run task

    gulp.task('concat', function() {
        gulp.src(url.concat.js_core)
            .pipe(concat(url.concat.namejs_core + '.js'))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(destjs));

        gulp.src(url.concat.css_core)
            .pipe(concatCss(url.concat.namecss_core + '.css', {
                includePaths: '',
                rebaseUrls: false,
                inlineImports: false
            }))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(destcss));

        gulp.src(url.concat.js)
            .pipe(concat(url.concat.namejs + '.js'))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(destjs));

        gulp.src(url.concat.css)
            .pipe(concatCss(url.concat.namecss + '.css', {
                includePaths: '',
                rebaseUrls: false,
                inlineImports: false
            }))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(destcss));
    });

}