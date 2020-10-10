"use strict";

import path from "path";
import minifyJS from "gulp-uglify";
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
	let dest = path.join(target);

	// Run task

	gulp.task("uglify", () => {
		return (
			gulp
				.src(path.join(target, "**/*.js"))
				.pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
				.pipe(minifyJS())
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
