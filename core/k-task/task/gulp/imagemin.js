'use strict';

import path from 'path';
import del from 'del';
import imagemin from 'gulp-imagemin';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task

    gulp.task('imagemin', () => {

        return gulp.src(path.join(target, '**/.{gif,png,jpg,jpeg,bmp,svg}'))
            .pipe(imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 7 }),
                imagemin.svgo({ plugins: [{ removeViewBox: true }] })
            ], {
                verbose: true
            }))
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });

}