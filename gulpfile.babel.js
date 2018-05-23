'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';
import wrench from 'wrench';
import runSequence from 'run-sequence';
import genfile from 'gulp-file'
import babel from 'gulp-babel';


const fs = require('fs');
const fse = require('fs-extra');
const yaml = require("js-yaml");
const load = yaml.load(fs.readFileSync("./k-task/config.yml"));
const loadSEO = JSON.parse(fs.readFileSync("./core/seo.json"));
const loadCC = JSON.parse(fs.readFileSync("./core/concat.json"));
const getApp = JSON.parse(fs.readFileSync("./@SITE/setup.json"));
var loadGEN = JSON.parse(fs.readFileSync(load.config.src + "/" + load.config.dev + "/include.json"));

var srcgettmp = ''
var devgettmp = ''

if (process.argv.slice(2).indexOf("builder") > -1) {
	srcgettmp = load.config.src
	devgettmp = load.config.dev
} else if (process.argv.slice(2).indexOf("dev") > -1) {
	srcgettmp = load.config.src
	devgettmp = load.config.dev
} else if (process.argv.slice(2).indexOf("serve") > -1 || process.argv.slice(2).indexOf("server") > -1) {
	loadGEN = JSON.parse(fs.readFileSync("./@SITE/" + getApp.sitename + "/include.json"));
	srcgettmp = "@SITE"
	devgettmp = getApp.sitename
}

loadGEN.src = srcgettmp
loadGEN.dev = devgettmp

// Global
const plugins = gulpLoadPlugins();

// Create karma server
const KarmaServer = require('karma').Server;

// Create a new browserSync

const defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

load.config.concat = loadCC.concat
load.config.SEO = loadSEO.SEO
load.config.SETUP = loadGEN.SETUP
load.config.src = loadGEN.src
load.config.dev = loadGEN.dev

// Call Config
let config = Object.assign({}, load.config, defaultNotification);

// Call ENV
let setgulp = minimist(process.argv.slice(2));

let target = setgulp.production ? config.dest : config.tmp;

let browserSync = browserSyncLib.create();
// Load Gulp tasks folder
wrench.readdirSyncRecursive('./k-task/task/gulp').filter((file) => {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./k-task/task/gulp/' + file)(gulp, setgulp, plugins, config, target, browserSync);
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.start('k-task');
});

gulp.task('test', ['clean'], () => {
    gulp.start('testing');
});

gulp.task('serve', ['clean'], () => {
    gulp.start('ser');
});

gulp.task('dev', ['clean'], () => {
    gulp.start('k-dev');
});

gulp.task('builder', ['clean'], () => {
	gulp.start('k-builder');
});

gulp.task('server', ['clean'], () => {
    gulp.start('ser');
});

// Basic production-ready code
gulp.task('k-task', function(cb) {
    runSequence(
        'sass', // css, less, stylus
        'concat',
        'babel',
        'babel-concat',
        'pug', // hamber, ejs, pug
        'copy',
        'fonts',
        cb
    );
});

gulp.task('ser', function(cb) {
    runSequence(
        'k-task',
        'inject',
        'browserSync',
        'watch',
        cb
    );
});

// Basic production-ready code
gulp.task('k-dev', function (cb) {
	runSequence(
		'k-task',
		'inject',
		'browserSync',
		'watch',
		cb
	);
});

gulp.task('k-builder', function (cb) {
	runSequence(
		'pug-copy-dev', // hamber, ejs, pug
		'sass-dev', // css, less, stylus
		'concat',
		'babel',
		'babel-concat-dev',
		'copy',
		'fonts',
		'pug-dev', // hamber, ejs, pug
		'inject-dev',
		'pug-rename-dev',
		'map-dev',
		'copytool',
		'concattool',
		cb
	);
});



// Testing
gulp.task('testing', (done) => {
    new KarmaServer({
        configFile: path.join(__dirname, '/k-task/karma.conf.js'),
        singleRun: !setgulp.watch,
        autoWatch: setgulp.watch
    }, done).start();
});
