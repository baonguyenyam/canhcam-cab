"use strict";

import fs from "fs";
import path from "path";
import foldero from "foldero";
import jade from "jade";
import yaml from "js-yaml";

module.exports = function (
	gulp,
	setgulp,
	plugins,
	config,
	target,
	browserSync
) {
	let url = config;
	let destjade = path.join(target);
	let dataPath = path.join(url.source, url.data);
	// Run task

	// Jade template compile
	gulp.task("jade", () => {
		let siteData = {};
		if (fs.existsSync(dataPath)) {
			// Convert directory to JS Object
			siteData = foldero(dataPath, {
				recurse: true,
				whitelist: "(.*/)*.+.(json|ya?ml)$",
				loader: function loadAsString(file) {
					let json = {};
					try {
						if (path.extname(file).match(/^.ya?ml$/)) {
							json = yaml.safeLoad(fs.readFileSync(file, "utf8"));
						} else {
							json = JSON.parse(fs.readFileSync(file, "utf8"));
						}
					} catch (e) {
						console.log("Error Parsing JSON file: " + file);
						console.log("==== Details Below ====");
						console.log(e);
					}
					return json;
				},
			});
		}

		// Add --debug option to your gulp task to view
		// what data is being loaded into your templates
		if (setgulp.debug) {
			console.log(
				"==== DEBUG: site.data being injected to templates ===="
			);
			console.log(siteData);
			console.log(
				"\n==== DEBUG: package.json config being injected to templates ===="
			);
			console.log(config);
		}

		return gulp
			.src([
				path.join(url.source, url.dev, url.layouts.jade, "**/*.jade"),
				"!" + path.join(url.source, "{**/_*,**/_*/**}"),
				"!" + path.join(url.source, url.layouts.jade, url.ignore.jade),
			])
			.pipe(plugins.changed(destjade))
			.pipe(plugins.plumber())
			.pipe(
				plugins.jade({
					jade: jade,
					pretty: true,
					locals: {
						config: config,
						debug: true,
						site: {
							data: siteData,
						},
					},
				})
			)
			.pipe(
				plugins.htmlmin({
					collapseBooleanAttributes: true,
					conservativeCollapse: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
				})
			)
			.pipe(gulp.dest(destjade));
		// .on('end', browserSync.reload);
	});
};
