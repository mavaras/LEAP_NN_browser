const fs = require('fs');
const sys = require('sys');
const express = require("express");
const app = express();
const path = require("path");
const morgan = require('morgan');
const body_parser = require("body-parser");
const hbs = require("hbs");
const multer = require("multer");
var mnist = require('mnist');
var ps = require('python-shell'); 

var upload = multer({});
/*var set = mnist.set(8000, 2000);

var trainingSet = set.training;
var testSet = set.test;
*/

/*ps.PythonShell.run("test.py", {args: ["asdflk"]}, function(err, res) {
	if (err) throw err;
	console.log(res);
});*/


path.join(__dirname, "/views");
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.use(morgan('dev'));
app.use(body_parser.urlencoded({extended: false}));
app.set("port", 3000);

app.get("/", (req, res) => {
	res.render("test");
});

app.post("/recognize", (req, res) => {
	var data = req.body.canvas.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, "base64");
	fs.writeFile("public/image.png", buf);

	ps.PythonShell.run("test.py", null, function(err, result) {
		if (err) throw err;
		console.log(result);
		res.end(result[0]);
	});
});

app.listen(3000, () => {
    console.log("server on");
});
