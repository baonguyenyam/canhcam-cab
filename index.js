var express = require('express');
var compression = require('compression');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');
var fse = require('fs-extra')
var crypto = require('crypto');
var multer = require('multer');
var browserSync = require('browser-sync');
var pug = require('pug');
var json_body_parser = bodyParser.json();
var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
var site = {
	port: process.env.PORT || 8080,
	root: './_tool',
	views: './_tool/views',
	lib: './CANHCAM-LIB',
	dest: './@SITE',
}
app.use(json_body_parser);
app.use(urlencoded_body_parser);
app.use('/', express.static(site.root + '/'));

if (process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true;
	app.listen(site.port, listening);
	function listening() {
		browserSync({
			files: [site.root + '/**/*.{js,css}'],
			notify: false,
			online: false,
			open: true,
			port: site.port + 1,
			proxy: 'localhost:' + site.port,
			ui: false
		});
	}
} else {
	app.listen(site.port, function () {
		console.log('App listening on port !' + site.port);
		require("openurl").open("http://localhost:" + site.port + '/index.cab')
	});

}
app.set('view engine', 'pug')
app.set('views', site.views)

router.use(function (req, res, next) {
	next();
});

router.get('/', function (req, res) {
	res.render('index', { key: makeid(200), val: makeid(20), memory: process.memoryUsage(), cpu: process.cpuUsage(), platform: process.platform, version: process.versions })
})

app.use('/', router);
app.use('/index.cab', router);

// handling 404 errors
app.get('*', function (req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});
app.use(function (err, req, res, next) {
	if (err.status !== 404) {
		return next();
	}
	res.status(400);
	res.render('404.pug', { title: "404 We're sorry!", desc: "We couldn't find what you're looking for", btn: "» Go back to the main page" });
});
app.use(function (err, req, res, next) {
	if (err.status !== 500) {
		return next();
	}
	res.status(500);
	res.render('500.pug', { title: "500 Internal server error", desc: "Application is shutting down on the web server." });
});

app.use(compression());
router.get(/\/js/, express.static(site.root + '/js'));
router.get(/\/css/, express.static(site.root + '/css'));
router.get(/\/img/, express.static(site.root + '/img'));

var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, site.root + "/img/layout");
	},
	filename: function (req, file, callback) {
		let type = 'jpg'
		if (file.mimetype === 'image/png') {
			type = 'png'
		} else if (file.mimetype === 'image/jpeg') {
			type = 'jpeg'
		} else {
			type = 'jpg'
		}
		callback(null, crypto.createHash('md5').update(Date.now() + "_" + removeVietnam(file.originalname.substring(0, 10))).digest('hex') + '.' + type);
	}
});

var upload = multer({ storage: Storage }).array(
	"imgUploader",
	"selectCompo",
	"comkey",
	"commain",
	"comnum",
	"heightCompo",
	"nameCompo",
	"nameNoted",
	10
);

function removeVietnam(s) {
	var r = s.toLowerCase().replace(/\s+/g, '-');
	non_asciis = {
		'-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
		'a': '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
		'ae': 'æ',
		'c': 'ç',
		'e': '[èéẹẽẻềệếểễê]',
		'd': '[đ]',
		'i': '[ìíîïị]',
		'n': 'ñ',
		'o': '[òóôõöộồốổỗơởợỡờớôơ]',
		'oe': 'œ',
		'u': '[ùúûűüủụưửựứừữư]',
		'y': '[ýỳỷỵỹ]'
	};
	for (i in non_asciis) {
		r = r.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	r = r.replace(/[^\w\s]/gi, '-')
	return r
};

app.post('/upload', function (req, res) {
	upload(req, res, function (err) {
		let dataToAdd = []
		let mainkey = req.body.selectCompo.trim()
		let keynew = req.body.selectCompo.trim() + '-' + req.body.comnum.trim()
		dataToAdd.push(req.body.selectCompo.trim() + '/' + req.body.comkey.trim())
		dataToAdd.push(req.body.commain.trim())
		dataToAdd.push(req.files[0].filename)
		dataToAdd.push(req.body.nameCompo.trim())
		if (req.body.heightCompo && req.body.heightCompo.length > 0) {
			dataToAdd.push(req.body.heightCompo.trim())
		} else {
			dataToAdd.push("")
		}
		if (req.body.nameNoted && req.body.nameNoted.length > 0) {
			dataToAdd.push(req.body.nameNoted.trim())
		} else {
			dataToAdd.push("")
		}
		fs.readFile(site.root + '/data.json', 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log(err);
			} else {
				var getDat = JSON.parse(data)
				getDat[mainkey][keynew] = dataToAdd
				var aResultS = getDat

				var jsonJS = JSON.stringify(aResultS, null, 4);
				fs.writeFileSync(site.root + '/data.json', jsonJS, 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
				});
			}
		});
		if (err) {
			return res.end("error");
		}
		return res.end("done");
	});
});

app.post('/savedata', function (req, res) {
	var dir2 = './core/scripts';
	var jsonColor = JSON.stringify(req.body.dataColor, null, 4);
	var jsonJS = JSON.stringify(req.body.dataJS, null, 4);
	try {
		fs.writeFileSync(site.lib + '/_core/_colors.sass', jsonColor.replace(/["]/gi, ''), 'utf8', function (err) {
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

router.get('/getdata', function (req, res) {
	var dataE
	fs.readFile(site.lib + '/_core/_colors.sass', 'utf8', function readFileCallback(err, data) {
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
router.get('/getdatajs', function (req, res) {
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
app.post('/checksite', function (req, res) {
	let val = true
	fs.readdir(site.dest, function (err, items) {
		for (var i = 0; i < items.length; i++) {
			if (req.body.site === items[i]) {
				val = false
			}
		}
		if (!val) {
			res.send('fail')
		} else {
			res.send('done')
		}
	});
})

router.get('/getreadysite', function (req, res) {
	let val = []
	fs.readdir(site.dest, function (err, items) {
		for (var i = 0; i < items.length; i++) {
			if (items[i].indexOf(".") > -1) {
			} else {
				val.push(items[i])
			}
		}
		res.send(val)
	});
})

app.post('/createsite', function (req, res) {
	var json = JSON.stringify(req.body.data, null, 4);
	var dir = site.dest + '/' + req.body.name

	try {
		fs.writeFileSync(site.dest + '/setup.json', "{\"sitename\": \"" + req.body.name + "\"}", 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
		fs.writeFileSync(site.root + '/justbuild.json', "{\"sitename\": \"" + req.body.name + "\"}", 'utf8', function (err) {
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
	fse.copySync(site.lib + '/_core', dir + '/lib/_core');
	fse.copySync(site.lib + '/_includes.sass', dir + '/lib/_includes.sass');
	fse.move(dir + '/styles', dir + '/lib/styles', err => { });
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
	copyLibsUse(site.lib + '/' + val, dir + '/lib/' + val)
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

function makeid(e) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	for (var i = 0; i < e; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function PugCom(a, b) {
	var outFileStream, parseFiles, writeToOutput;
	parseFiles = function (dirname) {
		var compiled, file, fileContents, filenames, i, pathv, len, results, stats;
		file = path.join(dirname)
		results = [];
		fileContents = fs.readFileSync(file, 'utf8');
		compiled = pug.compile(fileContents, {
			client: true,
			compileDebug: false,
			filename: file
		});
		writeToOutput(compiled, file.replace('.pug', ''))

		return results;
	};

	writeToOutput = function (fn, fnName) {
		var fnString;
		var id = makeid(10)
		fnString = fn.toString().replace('function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html +', "var " + id + " = ").replace('return pug_html;}', 'document.write(' + id + ');;')
		return outFileStream.write(fnString);
	};
	outFileStream = fs.createWriteStream(b, {
		flags: 'w'
	});
	parseFiles(a, b);
}
PugCom(site.root + '/views/cab.pug', site.root + '/views/cab.js')
PugCom(site.root + '/views/modal.pug', site.root + '/views/modal.js')