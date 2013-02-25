var mongoose = require('mongoose');

// ******** Player model ******** 

var playerSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
});

var Player = mongoose.model('Player', playerSchema);


// ******** Unit model ******** 

var unitSchema = mongoose.Schema({
	player_id: mongoose.Schema.Types.ObjectId,
	type_id: mongoose.Schema.Types.ObjectId,
	coordinate: {
		x: Number,
		y: Number
	}
});

var Unit = mongoose.model('Unit', unitSchema);


// ******** Unit Type model ******** 

var unitTypeSchema = mongoose.Schema({
	name: String
});

var UnitType = mongoose.model('UnitType', unitTypeSchema);


// ******** Node.js Export ******** 

module.exports = {
	Player: Player,
	Unit: Unit,
	UnitType: UnitType
}