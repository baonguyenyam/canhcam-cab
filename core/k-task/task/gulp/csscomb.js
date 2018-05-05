'use strict';

import path from 'path';
import csscomb from 'gulp-csscomb';
import gulpif from 'gulp-if';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('csscomb', () => {
        return gulp.src(path.join(target, '**/*.css'))
            .pipe(plugins.autoprefixer([
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24', // Firefox 24 is the latest ESR 
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ]))
            .pipe(csscomb())
            .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });

}