'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task

    gulp.task('local-run', () => {

        return gulp.src([
                path.join(target, '**/*.html'),
                '!' + path.join(target, '*.html')
            ])
            .pipe(replace('/css/', '../css/'))
            .pipe(replace('/js/', '../js/'))
            .pipe(replace('/favicon/', '../favicon/'))
            .pipe(replace('/img/', '../img/'))
            .pipe(replace('href="//', 'href="@@@'))
            .pipe(replace('href="/', 'href="../'))
            .pipe(replace('href="@@@', 'href="//'))
            .pipe(replace('../img/logo.png', '/img/logo.png'))
            .pipe(replace('../img/logo.png', '/img/logo.png'))
            .pipe(replace('//' + config.SEO.cfg_url + '../img/', '//' + config.SEO.cfg_url + '/img/'))
			.pipe(replace('.img/', './img/'))

        // .pipe(plugins.changed(dest))
        .pipe(gulp.dest(dest));

    });
    gulp.task('local-run-home', () => {

        return gulp.src([
                path.join(target, '*.html')
            ])
            .pipe(replace('/css/', 'css/'))
            .pipe(replace('/js/', 'js/'))
            .pipe(replace('/favicon/', 'favicon/'))
            .pipe(replace('/img/', 'img/'))
            .pipe(replace('href="//', 'href="@@@'))
            .pipe(replace('href="/', 'href="'))
            .pipe(replace('href="@@@', 'href="//'))
            .pipe(replace('img/logo.png', '/img/logo.png'))
			.pipe(replace('//' + config.SEO.cfg_url + 'img/', '//' + config.SEO.cfg_url + '/img/'))
			.pipe(replace('.img/', './img/'))

        // .pipe(plugins.changed(dest))
        .pipe(gulp.dest(dest));

    });

}
