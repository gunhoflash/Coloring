var Target = require('../models/target');
var Crypto = require('crypto');

exports.createTarget = (req, res, host, target_number) => {

	// get hash from email and target-number
	var hashed = Crypto.createHash('sha1').update(`target-${host.email}-${target_number}`);

	// set properties
	var value = {
		name: req.body.name,
		age: req.body.age,
		sex: req.body.sex,
		grade: req.body.grade,
		hashed: hashed.digest('hex'),
		host_id: host.id,
		score: 0
	};
	
	// create target and save
	return new Promise((resolve, reject) => {
		Target.create(value, (err, target) => {
			if (err) {
				reject(err);
			} else {
				console.log(`new target.id = ${target.id}`);
				resolve(target);
			}
		});
	});
};

exports.getTarget = (hashed) => {
	console.log(`getTarget: ${hashed}`);
	return Target.findOne({
		hashed: hashed
	});
};