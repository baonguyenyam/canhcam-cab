"use strict";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	// Run task
	gulp.task("php", function (done) {
		connect.server({ base: target, port: config.proxy, keepalive: true });
		done();
	});

	gulp.task(
		"browserSyncPhp",
		gulp.series("php", (done) => {
			browserSync.init({
				open: process.argv.slice(2) == "server" ? true : false,
				proxy: config.host + ":" + config.proxy,
				startPath: config.baseUrl,
				port: config.port || config.sameport,
			});
			done();
		})
	);
};
