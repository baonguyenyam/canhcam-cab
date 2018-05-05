'use strict';

import path from 'path';
import cssBase64 from 'gulp-css-base64';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('tobase64', () => {
        return gulp.src(path.join(target, '**/*.css'))
            .pipe(cssBase64({
                baseDir: '../' + url.images,
                maxWeightResource: 100,
                extensionsAllowed: ['.gif', '.jpg', '.png']
            }))
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });
}