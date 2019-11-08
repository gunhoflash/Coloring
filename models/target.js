var mongoose = require('mongoose');

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
	score: Number,
	relationship: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Target', TargetSchema);
