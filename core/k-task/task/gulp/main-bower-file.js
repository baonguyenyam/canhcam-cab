'use strict';

import path from 'path';
import mainBowerFiles from 'gulp-main-bower-files';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target, url.fonts);

    // Run task
    gulp.task('main-bower-files', () => {
        return gulp.src('./bower.json')
            .pipe(mainBowerFiles())
            .pipe(gulp.dest(dest));
    });
}