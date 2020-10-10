"use strict";

import path from "path";
import concat from "gulp-concat";
import concatCss from "gulp-concat-css";
import minifyCss from "gulp-csso";
import minifyJS from "gulp-uglify";
import rename from "gulp-rename";
import csscomb from "gulp-csscomb";
import autoprefixer from "gulp-autoprefixer";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	let url = config;
	let dest = path.join("CAB-DAB");
	let destjs = path.join("CAB-DAB", "views");
	let destcss = path.join("CAB-DAB", "views");

	// Run task

	gulp.task("concattoolJsVendor", () => {
		return gulp
			.src([
				"CAB-DAB/vendor/js/jquery-3.2.1.slim.min.js",
				"CAB-DAB/vendor/js/popper.min.js",
				"CAB-DAB/vendor/js/bootstrap.min.js",
				"CAB-DAB/vendor/js/sortable.min.js",
				"CAB-DAB/vendor/js/bootstrap-colorpicker.min.js",
				"CAB-DAB/vendor/js/jquery-quickedit.js",
				"CAB-DAB/vendor/js/typeahead.jquery.min.js",
				"CAB-DAB/vendor/js/select2.full.min.js",
				"CAB-DAB/vendor/js/bootstrap-tour.min.js",
				"CAB-DAB/vendor/js/offline.min.js",
				"CAB-DAB/vendor/js/pace.min.js",
				"CAB-DAB/vendor/js/run_prettify.js",
				"CAB-DAB/vendor/js/beauty.js",
				"CAB-DAB/vendor/js/keymaster.js",
			])
			.pipe(concat(url.concat.namejs_core + ".js"))
			.pipe(minifyJS())
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
	});

	gulp.task("concattoolBootstrap", () => {
		return gulp
			.src(["CAB-DAB/vendor/css/bootstrap.min.css"])
			.pipe(
				concatCss(url.concat.namecss_core + ".css", {
					includePaths: "",
					rebaseUrls: false,
					inlineImports: false,
				})
			)
			.pipe(minifyCss())
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destcss));
	});

	gulp.task("concattoolCSSVenddor", () => {
		return gulp
			.src([
				"CAB-DAB/vendor/css/font-awesome.min.css",
				"CAB-DAB/vendor/css/bootstrap-colorpicker.min.css",
				"CAB-DAB/vendor/css/select2.min.css",
				"CAB-DAB/vendor/css/bootstrap-tour.min.css",
				"CAB-DAB/vendor/css/offline-language-vietnam.css",
				"CAB-DAB/vendor/css/offline-theme-chrome.css",
				"CAB-DAB/vendor/css/pace-theme-mac-osx.css",
				"CAB-DAB/vendor/css/run_prettify.css",
				"CAB-DAB/css/main.css",
			])
			.pipe(
				concatCss(url.concat.babelconcat + ".css", {
					includePaths: "",
					rebaseUrls: false,
					inlineImports: false,
				})
			)
			.pipe(
				autoprefixer([
					"Android 2.3",
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 8",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6",
				])
			)
			.pipe(csscomb())
			.pipe(minifyCss())
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destcss));
	});

	gulp.task("concattoolJsCore", () => {
		return gulp
			.src([
				"CAB-DAB/js/core.js",
				"CAB-DAB/js/main.js",
				"CAB-DAB/js/dab.js",
				"CAB-DAB/js/key.js",
				"CAB-DAB/js/tour.js",
			])
			.pipe(plugins.babel())
			.pipe(plugins.changed(dest))
			.pipe(concat(url.concat.babelconcat + ".js"))
			.pipe(minifyJS())
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(destjs));
	});

	gulp.task(
		"concattool",
		gulp.parallel([
			"concattoolJsVendor",
			"concattoolBootstrap",
			"concattoolCSSVenddor",
			"concattoolJsCore",
		])
	);
};
