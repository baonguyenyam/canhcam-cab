'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import minifyHtml from 'gulp-htmlmin';
import replace from 'gulp-replace';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task

    gulp.task('htmlmin', () => {

        return gulp.src(path.join(target, '**/*.html'))
            .pipe(minifyHtml({ collapseWhitespace: true }))
            .pipe(replace('</html></html>', '</html>'))
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));

    });

}