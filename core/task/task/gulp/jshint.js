'use strict';

import path from 'path';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('jshint', () => {
        return gulp.src([
                path.join('gulpfile.babel.js'),
                path.join(url.source, url.scripts.javascript, '**/*.js'),
                // Ignore all vendor folder files
                '!' + path.join(url.source, url.ignore.test)
            ])
            .pipe(plugins.jshint('.jshintrc'))
            .pipe(plugins.jshint.reporter(require('jshint-stylish')));
    });
}