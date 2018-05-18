var express = require('express');
var compression = require('compression');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');
var fse = require('fs-extra')
var crypto = require('crypto');
var multer = require('multer');
var browserSync = require('browser-sync');
const port = 8080; 
var json_body_parser = bodyParser.json();
var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
app.use(json_body_parser);
app.use(urlencoded_body_parser);
app.use('/', express.static(__dirname + '/_tool/'));

if (process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true;
	app.listen(port, listening);
	function listening() {
		browserSync({
			files: ['_tool/**/*.{js,css}'],
			online: false,
			open: true,
			port: port + 1,
			proxy: 'localhost:' + port,
			ui: false
		});
	}
} else {
	app.listen(port, function () {
		console.log('App listening on port 8080!');
		require("openurl").open("http://localhost:8080")
	});

}

app.set('view engine', 'pug')
app.set('views', './_tool/views')
app.get('/', function (req, res) {
	res.render('index')
})
app.use(compression());

app.get(/\/js/, express.static(path.join(__dirname + '/_tool/', 'js')));
app.get(/\/css/, express.static(path.join(__dirname + '/_tool/', 'css')));
app.get(/\/images/, express.static(path.join(__dirname + '/_tool/', 'images')));

var root = './CANHCAM-LIB';
var dest = './@SITE';

var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./_tool/img/layout");
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
		if (req.body.heightCompo && req.body.heightCompo.length > 0){
			dataToAdd.push(req.body.heightCompo.trim())
		} else {
			dataToAdd.push("")
		}
		if (req.body.nameNoted && req.body.nameNoted.length > 0){
			dataToAdd.push(req.body.nameNoted.trim())
		} else {
			dataToAdd.push("")
		}
		// console.log(req.files[0])
		// console.log(keynew)
		// console.log(dataToAdd)
		fs.readFile('_tool/data.json', 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log(err);
			} else {
				var getDat = JSON.parse(data)
				getDat[mainkey][keynew] = dataToAdd
				var aResultS = getDat

				var jsonJS = JSON.stringify(aResultS, null, 4);
				fs.writeFileSync('_tool/data.json', jsonJS, 'utf8', function (err) {
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
app.post('/checksite', function (req, res) {
	let val = true
	fs.readdir(dest, function (err, items) {
		for (var i = 0; i < items.length; i++) {
			if (req.body.site === items[i]){
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

app.get('/getreadysite', function (req, res) {
	let val = []
	fs.readdir(dest, function (err, items) {
		for (var i = 0; i < items.length; i++) {
			val.push(items[i])
		}
		res.send(val)
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

