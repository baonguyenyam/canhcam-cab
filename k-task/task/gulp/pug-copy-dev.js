"use strict";

import fs from "fs";
import path from "path";
import rename from "gulp-rename";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	let url = config;
	let dest = path.join("tmppug");

	// Run task
	gulp.task("pug-rename-dev", function () {
		return gulp
			.src([
				path.join("tmp", "template", "**/index.html"),
				"!" + path.join(url.src2, "{**/_*,**/_*/**}"),
			])
			.pipe(
				rename(function (path) {
					// var a = path.dirname.replace('/', '-')
					var a = path.dirname
						.replace(/\\/g, "-")
						.replace(/\//g, "-");
					path.dirname = "/";
					path.basename += "-" + a;
					path.extname = ".html";
				})
			)
			.pipe(plugins.changed("tmp"))
			.pipe(gulp.dest("tmp"));
	});
	// Run task
	gulp.task("pug-copy-dev", function () {
		return gulp
			.src([
				path.join(url.src2, "**/index.pug"),
				"!" + path.join(url.src2, "{**/_*,**/_*/**}"),
			])
			.pipe(plugins.changed(dest))
			.pipe(gulp.dest(dest));
	});

	gulp.task(
		"pug-insert-dev",
		gulp.series("pug-copy-dev", function (done) {
			fs.readdirSync("./tmppug/").forEach((f) => {
				var folder = f;
				fs.readdirSync("./tmppug/" + folder).forEach((fl) => {
					var getfile = "./tmppug/" + folder + "/" + fl;
					var data = fs
						.readFileSync(getfile + "/index.pug")
						.toString()
						.split("\n");
					if (folder === "header") {
						data.splice(
							0,
							0,
							"extends ../../../core/templates/_layout/layout.pug\nblock header"
						);
					} else if (folder === "footer") {
						data.splice(
							0,
							0,
							"extends ../../../core/templates/_layout/layout.pug\nblock footer"
						);
					} else {
						data.splice(
							0,
							0,
							"extends ../../../core/templates/_layout/layout.pug\nblock body"
						);
					}
					var text = data.join("\n\t");
					fs.writeFile(getfile + "/index.pug", text, function (err) {
						if (err) {
							throw err;
						} else {
							// console.log(data);
						}
					});
				});
			});
			done();
		})
	);

	gulp.task(
		"map-dev",
		gulp.series("pug-rename-dev", (done) => {
			var directoryPath = path.join("tmp");

			fs.writeFileSync(
				directoryPath + "/index.html",
				'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Documents</title><link rel="stylesheet" href="/css/bootstrap.min.css"></head><body><div class="container-fluid"><div class="row">'
			);

			setTimeout(() => {
				fs.readdir(directoryPath, function (err, files) {
					if (err) {
						return console.log("Unable to scan directory: " + err);
					}
					files
						.filter(function (file) {
							return file.substr(-5) === ".html";
						})
						.forEach(function (file) {
							fs.appendFile(
								directoryPath + "/index.html",
								'<div class="col-2 pt-1"><a href="./' +
									file +
									'">' +
									file +
									"</a></div>",
								function (err) {
									if (err) console.error(err);
								}
							);
						});
				});
			}, 3500);

			setTimeout(() => {
				fs.appendFile(
					directoryPath + "/index.html",
					'</div></div><script src="/js/jquery-3.2.1.slim.min.js" ></script><script src="/js/1.12.9/umd/popper.min.js"></script><script src="/js/bootstrap.min.js"></script></body></html>',
					function (err) {
						if (err) console.error(err);
					}
				);
			}, 7000);

			done();
		})
	);
};
