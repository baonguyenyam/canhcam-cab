"use strict";

import path from "path";
import rev from "gulp-rev";

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

	// Run task
	gulp.task("rev", () => {
		return gulp
			.src([
				path.join(target, "**/*.{css,js}"),
				"!" + path.join(target, url.styles.assets, url.ignore.inject),
				"!" + path.join(target, url.scripts.assets, url.ignore.inject),
			])
			.pipe(rev())
			.pipe(gulp.dest(dest))
			.pipe(rev.manifest())
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});
};
