var Res = require('./responseError');
var Target = require('../models/target');
var Crypto = require('crypto');

// create a new target
exports.createTarget = (host, target_number, name, age, sex, grade) => {

	// get hash from email and target-number
	var hashed = Crypto.createHash('sha1').update(`target-${host.email}-${target_number}`);

	// set properties
	var value = {
		name: name,
		age: age,
		sex: sex,
		grade: grade,
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

// return target(or null) from hashed
exports.getTargetByHashed = (hashed) => {
	if (!hashed) return null;
	console.log(`getTargetByHashed: ${hashed}`);
	return Target.findOne({ hashed: hashed });
};

// TODO: test it
// return target info or null from id
exports.getTargetInfoById = (id) => {
	return new Promise((resolve, reject) => {
		Target
		.findOne({ id: id })
		.then(target => {
			if (target) {
				return resolve({
					name: target.name,
					age: target.age,
					sex: target.sex,
					grade: target.grade,
					score: target.score
				});
			} else {
				return resolve(null);
			}
		});
	});
};

// TODO: test it
// return score(or 0) from hashed
exports.getScore = (hashed) => {
	return Target
	.findOne({ hashed: hashed })
	.then(target => {
		if (!target) return 0;
		return target.score;
	})
	.catch(err => {
		console.log(err);
		return 0;
	});
};

// TODO: test it
// add score
exports.addScore = (req, res) => {
	Target
	.findOne({ hashed: req.body.hashed })
	.then(target => {
		if (!target) return Res.rerror(res, '잘못된 hashed 값입니다.');

		var new_score = target.score + req.body.score;
		target.score = new_score;
		target.save(err => {
			if (err) {
				return Res.ruerror(res, err);
			} else {
				return res.json({
					result: 1,
					message: '성공적으로 기록되었습니다.',
					score: new_score
				});
			}
		});
	})
	.catch(err => Res.ruerror(res, err));
};

// log all hashed urls for test
exports.logAllHashedURL = () => {
	Target
	.find()
	.then(targets => {
		targets.forEach((target, index) => {
			console.log(`target ${index}: ${target.hashed}`);
		});
	});
};