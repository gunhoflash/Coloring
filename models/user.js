var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	hashed: {
		type: String,
		index: true,
		trim: true
	},
	score: {
		type: Number
	},
	host_name: {
		type: String
	},
	host_age: {
		type: Number
	},
	host_sex: {
		type: String
	},
	host_email: {
		type: String,
		index: true,
		unique: true
	},
	host_relationship: {
		type: String
	},
	target_name: {
		type: String
	},
	target_age: {
		type: Number
	},
	target_sex: {
		type: String
	},
	target_grade: {
		type: String
	},
}, {
	timestamps: true
});

UserSchema.methods.hash = (host_email) => {
	var sha = crypto.createHash('sha1');
	sha.update(`user-${host_email}`);
	var hashed = sha.digest('hex');

	return hashed;
};

module.exports = mongoose.model('User', UserSchema);
