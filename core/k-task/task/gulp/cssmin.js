"use strict";

import path from "path";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import gulpif from "gulp-if";

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

	gulp.task("cssmin", () => {
		return (
			gulp
				.src(path.join(target, "**/*.css"))
				.pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
				// .pipe(minifyCss())
				.pipe(
					cleanCSS({
						compatibility: "ie8",
						level: { 1: { specialComments: 0 } },
					})
				)
				.pipe(
					rename({
						suffix: ".min",
					})
				)
				.pipe(
					gulpif(!setgulp.production, plugins.sourcemaps.write("./"))
				)
				.pipe(gulp.dest(dest))
		);
	});
};
