"use strict";

import path from "path";
import inject from "gulp-inject";
import replace from "gulp-replace";

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
	gulp.task("inject", () => {
		var target2 = gulp.src(path.join(target, "*.html"));
		return target2
			.pipe(
				inject(
					gulp.src(
						[
							path.join(
								target,
								"**/*" + url.concat.namecss_core + ".css"
							),
							path.join(
								target,
								"**/*" + url.concat.namejs_core + ".js"
							),
							path.join(
								target,
								"**/*" + url.concat.namecss + ".css"
							),
							path.join(
								target,
								"**/*" + url.concat.namejs + ".js"
							),
							path.join(target, "**/*.css"),
							path.join(target, "**/*.js"),
							"!" +
								path.join(
									target,
									url.styles.assets,
									url.ignore.inject,
									"*.css"
								),
						],
						{
							read: false,
							ignorePath: "/" + target + "/",
							addRootSlash: true,
						}
					)
				)
			)
			.pipe(replace("/" + target + "/", "/"))
			.pipe(gulp.dest(dest))
			.on("end", browserSync.reload);
	});
};
