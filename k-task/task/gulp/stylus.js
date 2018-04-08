'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target, url.styles.assets);

    // Run task
    gulp.task('stylus', () => {


        var autoprefixerOpts = {
            browsers: [
                'last 2 versions',
                'iOS >= 7',
                'Android >= 4',
                'Explorer >= 10',
                'ExplorerMobile >= 11'
            ],
            cascade: false
        };

        gulp.src([
                path.join(url.source, url.styles.stylus, '**/*.styl'),
                '!' + path.join(url.source, '{**/\_*,**/\_*/**}'),
                '!' + path.join(url.source, url.styles.stylus, url.ignore.stylus)
            ])
            .pipe(plugins.plumber())
            .pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
            .pipe(plugins.stylus({
                    compress: true,
                    'include css': true
                }).on('error', function(err) {
                    plugins.util.log(err);
                })
                .on('error', plugins.notify.onError(config.defaultNotification)))
            .pipe(plugins.postcss([autoprefixer(autoprefixerOpts)]))
            .pipe(gulpif(!setgulp.production, plugins.sourcemaps.write('./')))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream({
                match: '**/*.css'
            }));


    });
}