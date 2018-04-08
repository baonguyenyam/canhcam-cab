'use strict'

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    // Run task
    gulp.task('browserSyncPhp', ['php'], () => {
        browserSync.init({
            open: (process.argv.slice(2) == 'server') ? true : false,
            proxy: config.host + ':' + config.proxy,
            startPath: config.baseUrl,
            port: config.port || config.sameport,

        })
    })
}