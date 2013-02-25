// IMPORTS

var Player = require("./models").Player;
var Unit = require("./models").Unit;
var UnitType = require("./models").UnitType;

// GLOBALS
var unitTypes = [];
function getUnitTypeIdByName(name) {
	for (var i=0; i<unitTypes.length; i++) {
		if (unitTypes[i].name == name) return unitTypes[i]._id;
	}
}

/** SECTION 1: Create the node, express and socket.io setup **/
/*************************************************************/

var express = require('express')
, http = require('http');
var app = express();
app.use(express.bodyParser());
var server = http.createServer(app);
var io = require('socket.io').listen(server);
//io.set('log level', 1);

server.listen(80);

/** SECTION 2: MongoDB ORM **/
/*************************************************************/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mastergame');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	
	console.log("DB Connection open");
	
	// Add unit types if no-one exists
	UnitType.find({ }, function(err, items) {
		unitTypes = items;
		console.log(items);
		if (items.length == 0) {
			UnitType.create({name: "Knight"}, function(err, unitType){
				unitTypes.push(unitType);
			});
			UnitType.create({name: "Archer"}, function(err, unitType){
				unitTypes.push(unitType);
			});
			UnitType.create({name: "Warrior"}, function(err, unitType){
				unitTypes.push(unitType);
			});
		}
	});
	
});
	

/** SECTION 3: Http request handling **/
/*************************************************************/

// Manual urls
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

// Setting static folders, all files (recursively) in these will be public
app.use(express.static(__dirname + '/public'));

// AJAX Calls

app.post('/weaklogin', function(req, res) {
	res.contentType('json');
	
	var query = {'username': req.body.username, 'password': req.body.password};
	Player.find(query, function (err, items) {
		if (items.length == 1) {
			var p = items[0];
			console.log(p.username + " logged inn");
			res.send({response: 'success', player: p});
		}
		else {
			res.send({response: 'fail', 'error': "Bad username or password"});
		}
	})
	
	
});

app.post('/createplayer', function(req, res) {
	res.contentType('json');

	var p = new Player({username: req.body.username, password: req.body.password});
	p.save(function (err, product) {
		if (err) {
			res.send({response: 'fail', error: err});
		}
		else {
			console.log(product.username + " is a new player");
			res.send({response: 'success', player: product});
		}
	});
});

app.post('/spawnknight', function(req, res) {
	res.contentType('json');
	var unitObjectId = getUnitTypeIdByName("Knight");
	Player.findById(req.body.playerid, function (err, player){
		//var unit =  // HÆR VAR Æ
	});
	console.log(req.body);
});