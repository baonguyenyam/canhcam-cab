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

	// Run task
	gulp.task("watch", () => {
		if (!setgulp.production) {
			// Concat
			gulp.watch(
				[path.join("./k-task/config.yml")],
				gulp.series("k-task", "inject")
			);

			// Styles
			gulp.watch(
				[
					path.join(url.src2, url.styles.root, "**/*.css"),
					path.join(url.source, url.styles.root, "**/*.css"),
				],
				gulp.series("css")
			);

			gulp.watch(
				[
					path.join(url.src2, url.styles.root, "**/*.less"),
					path.join(url.source, url.styles.root, "**/*.less"),
				],
				gulp.series("less")
			);

			gulp.watch(
				[
					path.join(url.src2, url.styles.root, "**/*.styl"),
					path.join(url.source, url.styles.root, "**/*.styl"),
				],
				gulp.series("styl")
			);

			gulp.watch(
				[
					path.join(url.src2, "**/*.{sass,scss}"),
					path.join(url.source, "**/*.{sass,scss}"),
				],
				gulp.series("sass", "inject")
			);

			// Scripts
			gulp.watch(
				[
					path.join(url.src2, "**/*.js"),
					path.join(url.source, "**/*.js"),
				],
				gulp.series("babel", "babel-concat")
			);

			gulp.watch(
				[path.join(url.src2, url.scripts.root, "**/*.coffee")],
				gulp.series("coffee")
			);

			// Templates
			gulp.watch(
				[
					path.join(url.src2, "**/*.jade"),
					path.join(url.src, "**/*.jade"),
					path.join(url.source, "**/*.jade"),
				],
				gulp.series("jade", "inject")
			);
			gulp.watch(
				[
					path.join(url.src2, "**/*.pug"),
					path.join(url.src, "**/*.pug"),
					path.join(url.source, "**/*.pug"),
				],
				gulp.series("pug", "inject")
			);

			gulp.watch(
				[path.join(url.src2, "**/*.nunjucks")],
				gulp.series("nunjucks")
			);

			// Copy
			gulp.watch(
				[
					path.join(
						url.src2,
						"**/*.{svg,jpg,jpeg,png,gif,txt,bmp,md,json,yml,yaml,css,html,js,eot,svg,ttf,woff,woff2}"
					),
				],
				gulp.series("copy")
			);

			// All other files
			gulp.watch([
				path.join(url.tmp, "**/*"),
				"!" + path.join(url.tmp, "**/*.{css,map,html,js}"),
			]).on("change", browserSync.reload);
		}
	});
};
