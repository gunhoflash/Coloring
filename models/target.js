var mongoose = require('mongoose');
var crypto = require('crypto');

var TargetSchema = new mongoose.Schema({
	name: String,
	age: Number,
	sex: String,
	grade: String,
	hashed: {
		type: String,
		index: true,
		trim: true
	},
	host_id: String,
	score: Number
}, {
	timestamps: true
});

module.exports = mongoose.model('Target', TargetSchema);
