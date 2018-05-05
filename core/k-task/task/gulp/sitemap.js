'use strict';

import path from 'path';
import sitemap from 'gulp-sitemap';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('sitemap', () => {
        return gulp.src([
                path.join(target, '**/*.html'),
                '!' + path.join(target, '**/404.html'),
                '!' + path.join(target, '**/403.html'),
                '!' + path.join(target, '**/400.html'),
                '!' + path.join(target, '**/500.html'),
                '!' + path.join(target, '**/502.html'),
                '!' + path.join(target, '**/503.html')
            ], {
                read: false
            })
            .pipe(sitemap({
                siteUrl: '//' + config.SEO.cfg_url
            }))
            .pipe(gulp.dest(dest));
    })
}