'use strict';

import path from 'path';
import glob from 'glob';
import browserify from 'browserify';
import watchify from 'watchify';
import envify from 'envify';
import babelify from 'babelify';
import _ from 'lodash';
import vsource from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    // Run task
    let url = config;

    let browserifyTask = (files) => {
        return files.map((entry) => {
            let dest = path.join(target);

            // Options
            let customOpts = {
                entries: [entry],
                debug: true,
                transform: [
                    babelify, // Enable ES6 features
                    envify // Sets NODE_ENV for better optimization of npm packages
                ]
            };

            let bundler = browserify(customOpts);

            // if (!setgulp.production) {
            // Setup Watchify for faster builds
            let opts = _.assign({}, watchify.setgulp, customOpts);
            bundler = watchify(browserify(opts));
            // }

            let rebundle = function() {
                let startTime = new Date().getTime();
                bundler.bundle()
                    .on('error', function(err) {
                        plugins.util.log(
                            plugins.util.colors.red('Browserify compile error:'),
                            '\n',
                            err.stack,
                            '\n'
                        );
                        this.emit('end');
                    })
                    .on('error', plugins.notify.onError(config.defaultNotification))
                    .pipe(vsource(entry))
                    .pipe(buffer())
                    .pipe(plugins.sourcemaps.init({
                        loadMaps: true
                    }))
                    .on('error', plugins.notify.onError(config.defaultNotification))
                    .pipe(plugins.rename(function(filepath) {
                        filepath.dirname = filepath.dirname.replace(url.source, '').replace('src', '').replace('scripts', '');
                    }))

                .pipe(plugins.sourcemaps.write('./'))
                    .pipe(gulp.dest(dest))
                    // Show which file was bundled and how long it took
                    .on('end', function() {
                        let time = (new Date().getTime() - startTime) / 1000;
                        console.log(plugins.util.colors.cyan(entry) + ' was browserified: ' + plugins.util.colors.magenta(time + 's'));
                        if (!setgulp.production) {
                            gulp.start('inject', function(err) {
                                if (err) {
                                    done(err);
                                } else {
                                    return browserSync.reload('**/*.js');
                                }
                            });
                        } else {
                            return gulp.start('rebuild');
                        }
                    });
            };

            // if (!setgulp.production) {
            bundler.on('update', rebundle); // on any dep update, runs the bundler
            bundler.on('log', plugins.util.log); // output build logs to terminal
            // }
            return rebundle();
        });
    };

    // Browserify Task
    gulp.task('browserify', (done) => {
        return glob(path.join(url.source, url.scripts.root, '**/*.js'),
            function(err, files) {
                if (err) {
                    done(err);
                }
                return browserifyTask(files);
            });
    });

}