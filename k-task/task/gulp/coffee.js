"use strict";

import path from "path";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	let url = config;
	let dest = path.join(target);
	let destjs = path.join(target, url.scripts.assets);

	// Run task
	gulp.task("coffee", () => {
		return gulp
			.src([path.join(url.source, url.scripts.coffee, "**/*.coffee")])
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.coffee())
			.on("error", function (err) {
				plugins.util.log(err);
			})
			.on("error", plugins.notify.onError(config.defaultNo))
			.pipe(plugins.sourcemaps.write("."))
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
	});
};
