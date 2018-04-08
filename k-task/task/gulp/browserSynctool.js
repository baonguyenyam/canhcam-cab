'use strict';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    // Run task
	gulp.task('browserSynctool', () => {
        browserSync.init({
            open: true,
            startPath: config.baseUrl,
            port: config.port || config.sameport,
            server: {
                baseDir: 'tmptool',
                routes: (() => {
                    let routes = {};

                    // Map base URL to routes
                    routes[config.baseUrl] = 'tmptool';

                    return routes;
                })()
            }
        });
    });
}
