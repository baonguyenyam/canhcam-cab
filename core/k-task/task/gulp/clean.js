'use strict';

import path from 'path';
import del from 'del';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('clean', del.bind(null, [
        path.join(url.tmp)
    ]));

    gulp.task('cleanall', del.bind(null, [
        path.join(url.tmp),
        path.join(url.dest)
    ]));
}
