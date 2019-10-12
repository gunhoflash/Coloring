var mongoose = require('mongoose');
var crypto = require('crypto');

var HostSchema = new mongoose.Schema({
	name: String,
	age: Number,
	sex: String,
	email: {
		type: String,
		index: true,
		unique: true
	},
	target1_id: String,
	target2_id: String,
	target1_relationship: String,
	target2_relationship: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Host', HostSchema);
