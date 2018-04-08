'use strict';

import path from 'path';
import markdown from 'gulp-markdown';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('markdown', () => {
        return gulp.src([
                path.join(url.source, '**/*.md')
            ])
            .pipe(markdown())
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });


}