"use strict";

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSyncLib from "browser-sync";
import minimist from "minimist";
import wrench from "wrench";
import runSequence from "run-sequence";
import { readFileSync } from "fs";
import { load as _load } from "js-yaml";
runSequence.options.ignoreUndefinedTasks = true;
const load = _load(readFileSync("./k-task/config.yml"));
const loadSEO = JSON.parse(readFileSync("./seo.json"));
const loadCC = JSON.parse(readFileSync("./concat.json"));
const loadGEN = JSON.parse(readFileSync("./include.json"));

// Global
const plugins = gulpLoadPlugins({ lazy: true });

// Create karma server
import { Server as KarmaServer } from "karma";

// Create a new browserSync

const defaultNotification = function (err) {
	return {
		subtitle: err.plugin,
		message: err.message,
		sound: "Funk",
		onLast: true,
	};
};

load.config.concat = loadCC.concat;
load.config.SEO = loadSEO.SEO;
load.config.SETUP = loadGEN.SETUP;

// Call Config
let config = Object.assign({}, load.config, defaultNotification);

// Call ENV
let setgulp = minimist(process.argv.slice(2));

let target = setgulp.production ? config.dest : config.tmp;

let browserSync = browserSyncLib.create();
// Load Gulp tasks folder
wrench
	.readdirSyncRecursive("./k-task/task/gulp")
	.filter((file) => {
		return /\.(js)$/i.test(file);
	})
	.map(function (file) {
		require("./k-task/task/gulp/" + file)(
			gulp,
			setgulp,
			plugins,
			config,
			target,
			browserSync
		);
	});

// Basic production-ready code
gulp.task(
	"k-task",
	gulp.series(
		"copy",
		"fonts",
		"sass",
		"concat",
		"babel",
		"babel-concat",
		"pug"
	)
);

gulp.task("ser", gulp.series("k-task", "inject", "browserSync", "watch"));

// Rebuild will call by browserify
gulp.task(
	"product",
	gulp.series(
		"k-task",
		// 'favicon',
		"cssmin",
		"uglify",
		"csscomb",
		"tobase64",
		"rev",
		"delete-css",
		"delete-js",
		"revreplace",
		"sitemap",
		"htmlmin",
		"imagemin",
		"header",
		"cleanup",
		"cleanup-js",
		"cleanup-css",
		"browserSync",
		"done"
	)
);

// Rebuild will call by browserify
gulp.task(
	"product-no",
	gulp.series(
		"k-task",
		// 'favicon',
		"csscomb",
		"tobase64",
		"inject",
		"sitemap",
		"htmlmin",
		"imagemin",
		"remove-comment-css",
		"remove-comment-js",
		"html-beautify",
		"header",
		"cleanup",
		"browserSync",
		"done"
	)
);

// Not min & can run without localhost
gulp.task(
	"product-local",
	gulp.series(
		"k-task",
		// 'favicon',
		"cssmin",
		"uglify",
		"csscomb",
		"tobase64",
		"rev",
		"delete-css",
		"delete-js",
		"revreplace",
		"sitemap",
		"htmlmin",
		"imagemin",
		"header",
		"cleanup",
		// 'cleanup-js',
		// 'cleanup-css',
		"local-run",
		"local-run-home",
		"browserSync",
		"done"
	)
);

// Not min & can run without localhost
gulp.task(
	"product-local-no",
	gulp.series(
		"k-task",
		// 'favicon',
		"csscomb",
		"tobase64",
		"inject",
		"sitemap",
		"htmlmin",
		"imagemin",
		// 'remove-comment-css',
		// 'remove-comment-js',
		"html-beautify",
		"header",
		"cleanup",
		"local-run",
		"local-run-home",
		"browserSync",
		"done"
	)
);

// Testing
gulp.task("testing", (done) => {
	new KarmaServer(
		{
			configFile: path.join(__dirname, "/k-task/karma.conf.js"),
			singleRun: !setgulp.watch,
			autoWatch: setgulp.watch,
		},
		done
	).start();
});

// Default task
gulp.task("default", gulp.series("clean", "k-task"));

gulp.task("test", gulp.series("clean", "testing"));

gulp.task("serve", gulp.series("clean", "ser"));

gulp.task("server", gulp.series("clean", "ser"));

// Build task
gulp.task("build", gulp.series("cleanall", "product"));

gulp.task("build-local", gulp.series("cleanall", "product-local"));

gulp.task("build-no", gulp.series("cleanall", "product-no"));

gulp.task("build-local-no", gulp.series("cleanall", "product-local-no"));
