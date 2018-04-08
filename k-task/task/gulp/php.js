'use strict';

import connect from 'gulp-connect-php';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {

    gulp.task('php', function() {
        connect.server({ base: target, port: config.proxy, keepalive: true });
    });

}