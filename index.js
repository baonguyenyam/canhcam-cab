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

app.get('/getdata', function (req, res) {
	res.end("done");
})

app.post('/createsite', function (req, res) {
	var json = JSON.stringify(req.body.data, null, 4);
	var dir = './src/' + req.body.name

	try {
		fs.writeFileSync('./src/setup.json', "{\"sitename\": \"" + req.body.name + "\"}", 'utf8', function (err) {
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
					fse.copySync('./core/_default', dir)
				} catch (err) {
					console.error(err)
				}
			} catch (err) {
				return console.log(err);
			}
		}
	} else {
		fs.readFile(dir +'/include.json', 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log(err);
			} else {
				fs.writeFile(dir +'/include.json', json, 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
				});
				try {
					fse.copySync('./core/_default', dir)
				} catch (err) {
					console.error(err)
				}
			}
		});
	}

	res.end("done");
});

app.listen(8080, function () {
	console.log('App listening on port 8080!');
	require("openurl").open("http://localhost:8080")
});
