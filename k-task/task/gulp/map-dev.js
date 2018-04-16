'use strict';

import path from 'path';
import fs from 'fs';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
	gulp.task('map-dev', () => {

		var directoryPath = path.join( 'tmp');

		fs.writeFileSync(directoryPath + '/index.html', '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Documents</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></head><body><div class="container"><div class="row"><div class="col">');

		fs.readdir(directoryPath, function (err, files) {
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			}
			files
				.filter(function (file) { return file.substr(-5) === '.html'; })
				.forEach(function (file) {
					fs.appendFile(directoryPath + '/index.html', '<p><a href="./' + file + '">' + file+'</a></p>', function (err) {
						if (err)
							console.error(err);
					});
			});
			fs.appendFile(directoryPath + '/index.html', '</div></div></div><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" ></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script></body></html>', function (err) {
				if (err)
					console.error(err);
			});
		});
    })
}
