var mongoose = require('mongoose');

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
	target2_id: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Host', HostSchema);
