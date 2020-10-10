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
	let dest = path.join(target);

	// Run task
	gulp.task("csscomb", () => {
		return gulp
			.src(path.join(target, "**/*.css"))
			.pipe(
				plugins.autoprefixer()
			)
			.pipe(csscomb())
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});
};
