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
	let dest = path.join("CAB-DAB/templates");

	// Run task
	gulp.task("copytool", function () {
		return gulp.src([path.join(url.tmp, "**/*")])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});
};
