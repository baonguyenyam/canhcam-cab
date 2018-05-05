'use strict';

import path from 'path';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target, url.fonts);

    // Run task
    gulp.task('fonts', () => {
        return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
                .concat(path.join(url.source, url.fonts, '**/*')))
            .pipe(gulp.dest(dest));
    });
}