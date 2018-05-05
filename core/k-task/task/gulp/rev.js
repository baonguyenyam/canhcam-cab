'use strict';

import path from 'path';
import del from 'del';
import babel from 'gulp-babel';
import through from 'through2';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);
    let destconfig = path.join(target, url.config);
    let destjs = path.join(target, url.scripts.assets);
    let destcss = path.join(target, url.styles.assets);

    // Run task
    gulp.task('rev', () => {
        return gulp.src([
                path.join(target, '**/*.{css,js}'),
                '!' + path.join(target, url.styles.assets, url.ignore.inject),
                '!' + path.join(target, url.scripts.assets, url.ignore.inject)
            ])
            .pipe(rev())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest())
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });




};
