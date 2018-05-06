var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');
var fse = require('fs-extra')

var json_body_parser = bodyParser.json();
var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
app.use(json_body_parser);
app.use(urlencoded_body_parser);

app.use('/', express.static(__dirname + '/_tool/'));

var root = './CANHCAM-LIB';
var dest = './@SITE';

app.post('/savedata', function (req, res) {
	var dir2 = './core/scripts';
	var jsonColor = JSON.stringify(req.body.dataColor, null, 4);
	var jsonJS = JSON.stringify(req.body.dataJS, null, 4);
	try {
		fs.writeFileSync(root + '/_core/_colors.sass', jsonColor.replace(/["]/gi, ''), 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
		fs.writeFileSync(dir2 + '/config.js', jsonJS.replace(/["]/gi, '').replace(/[\\]/gi, '"'), 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
	} catch (err) {
		return console.log(err);
	}
	res.end("done");
})

app.get('/getdata', function (req, res) {
	var dataE
	fs.readFile(root + '/_core/_colors.sass', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		} else {
			dataE = data
			dataE = dataE.replace("$mau: (", "{\"")
			non_asciis = { '': '[\n]', '"}': '[)]', '"#': '[#]', '","': ',', '":': ':' };
			for (i in non_asciis) { dataE = dataE.replace(new RegExp(non_asciis[i], 'gi'), i); }
			res.end(dataE);
		}
	});
})
app.get('/getdatajs', function (req, res) {
	var dir = './core/scripts';
	var dataE
	fs.readFile(dir + '/config.js', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		} else {
			dataE = data.replace("const CANHCAM_APP = ", "")
			res.end(dataE);
		}
	});
})

app.post('/createsite', function (req, res) {
	var json = JSON.stringify(req.body.data, null, 4);
	var dir = dest + '/' + req.body.name

	try {
		fs.writeFileSync(dest + '/setup.json', "{\"sitename\": \"" + req.body.name + "\"}", 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
		fs.writeFileSync('_tool/justbuild.json', "{\"sitename\": \"" + req.body.name + "\"}", 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
	} catch (err) {
		return console.log(err);
	}


	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		if (fs.existsSync(dir + '/include.json')) {
			try {
				fs.unlinkSync(dir + '/include.json');
			} catch (err) {
				return console.error(err);
			}
		} else {
			try {
				fs.writeFileSync(dir + '/include.json', json, 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
				});
				try {
					copyFiles(dir, req.body.data)
				} catch (err) {
					console.error(err)
				}
			} catch (err) {
				return console.log(err);
			}
		}
	} else {
		fs.readFile(dir + '/include.json', 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log(err);
			} else {
				fs.writeFile(dir + '/include.json', json, 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
				});
				try {
					copyFiles(dir, req.body.data)
				} catch (err) {
					console.error(err)
				}
			}
		});
	}

	res.end("done");
});

function copyFiles(dir, json) {
	fse.copySync('./core', dir);
	fse.copySync('./bower.json', dir + '/bower.json');
	if (!fs.existsSync(dir + '/lib')) {
		try {
			fs.mkdirSync(dir + '/lib');
		} catch (err) {
		}
	}
	buildFiles(dir, json)
	fse.copySync(root + '/_core', dir + '/lib/_core');
	fse.copySync(root + '/_includes.sass', dir + '/lib/_includes.sass');
	fse.move(dir + '/styles', dir + '/lib/styles', err => {});
}

function buildFiles(dir, json) {
	for (var key in json.SETUP) {
		if (json.SETUP.hasOwnProperty(key)) {
			fse.writeFileSync(dir + '/templates/' + key + '.pug', '');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', 'extends _layout/layout.pug\n');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', 'block variables\n');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', '\t- var title = "' + key + '"\n');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', '\t- var description = "Description for ' + key + ' page"\n');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', '\t- var bodyclass = "' + key + '"\n');
			fse.appendFileSync(dir + '/templates/' + key + '.pug', '\t- var href = "/' + key + '.html"\n');
			for (var u in json.SETUP[key]) {
				if (json.SETUP[key].hasOwnProperty(u)) {
					fse.appendFileSync(dir + '/templates/' + key + '.pug', 'block ' + u + '\n');
					for (var v in json.SETUP[key][u]) {
						let dirfull = json.SETUP[key][u][v].slice(0, json.SETUP[key][u][v].indexOf("/"))
						fse.appendFileSync(dir + '/templates/' + key + '.pug', '\tinclude ../lib/' + json.SETUP[key][u][v] + '/index.pug\n');
						createFolderLib(dir, dirfull, json.SETUP[key][u][v])
					}
				}
			}
		}
	}
}

function createFolderLib(dir, dirfull, val) {
	if (!fs.existsSync(dir + '/lib/' + dirfull)) {
		try {
			fs.mkdirSync(dir + '/lib/' + dirfull);
		} catch (err) {
		}
	}
	copyLibsUse(root + '/' + val, dir + '/lib/' + val)
}

function copyLibsUse(a, b) {
	async function copyFiles() {
		try {
			await fse.copy(a, b)
		} catch (err) {
		}
	}
	copyFiles()
}


app.listen(8080, function () {
	console.log('App listening on port 8080!');
	require("openurl").open("http://localhost:8080")
});
