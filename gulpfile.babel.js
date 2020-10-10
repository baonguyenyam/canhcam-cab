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
const loadSEO = JSON.parse(readFileSync("./core/seo.json"));
const loadCC = JSON.parse(readFileSync("./core/concat.json"));
const getApp = JSON.parse(readFileSync("./@SITE/setup.json"));
var loadGEN = JSON.parse(
	readFileSync(load.config.src + "/" + load.config.dev + "/include.json")
);

var srcgettmp = "";
var devgettmp = "";

if (process.argv.slice(2).indexOf("builder") > -1) {
	srcgettmp = load.config.src;
	devgettmp = load.config.dev;
} else if (process.argv.slice(2).indexOf("dev") > -1) {
	srcgettmp = load.config.src;
	devgettmp = load.config.dev;
} else if (
	process.argv.slice(2).indexOf("serve") > -1 ||
	process.argv.slice(2).indexOf("server") > -1
) {
	loadGEN = JSON.parse(
		readFileSync("./@SITE/" + getApp.sitename + "/include.json")
	);
	srcgettmp = "@SITE";
	devgettmp = getApp.sitename;
}

loadGEN.src = srcgettmp;
loadGEN.dev = devgettmp;

// Global
const plugins = gulpLoadPlugins();

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
load.config.src = loadGEN.src;
load.config.dev = loadGEN.dev;

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
gulp.task("k-task", gulp.series(
	"sass", // css, less, stylus
	"concat",
	"babel",
	"babel-concat",
	"pug", // hamber, ejs, pug
	"copy",
	"fonts",
));

gulp.task("ser", gulp.series("k-task", "inject", "browserSync", "watch"));

// Basic production-ready code
gulp.task("k-dev", gulp.series("k-task", "inject", "browserSync", "watch"));

gulp.task(
	"k-builder",
	gulp.series(
		"pug-copy-dev", // hamber, ejs, pug
		"sass-dev", // css, less, stylus
		"concat",
		"babel",
		"babel-concat-dev",
		"copy",
		"fonts",
		"pug-dev", // hamber, ejs, pug
		"pug-rename-dev",
		"map-dev",
		"concattool",
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

gulp.task("dev", gulp.series("clean", "k-dev"));

gulp.task("builder", gulp.series("clean", "k-builder"));

gulp.task("server", gulp.series("clean", "ser"));
