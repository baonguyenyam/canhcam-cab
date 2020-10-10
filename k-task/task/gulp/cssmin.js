"use strict";

import path from "path";
import minifyCss from "gulp-csso";
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

	gulp.task("cssmin", () => {
		return (
			gulp
				.src(path.join(target, "**/*.css"))
				.pipe(gulpif(!setgulp.production, plugins.sourcemaps.init()))
				.pipe(minifyCss())
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
