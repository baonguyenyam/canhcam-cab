"use strict";

import colors from "colors";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	let banner = [
		" ",
		"/////////////////////////////////////",
		"// K-TASK",
		"// v6.0.0",
		"/////////////////////////////////////",
		" ",
	].join("\n");

	// Run task
	gulp.task("done", (done) => {
		return console.log(
			colors.rainbow("\nCongratulations!\n"),
			colors.green(banner),
			colors.magenta("\nBuild Finished! Press Ctrl+C to exit.")
		);
	});
};
