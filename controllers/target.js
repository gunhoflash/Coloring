var Res = require('./responseError');
var Target = require('../models/target');
var Crypto = require('crypto');

// create a new target
exports.createTarget = (host, target_number, name, age, sex, grade, relationship) => {

	// get hash from email and target-number
	var hashed = Crypto.createHash('sha1').update(`target-${host.email}-${target_number}`);

	// set properties
	var value = {
		name         : name,
		age          : age,
		sex          : sex,
		grade        : grade,
		hashed       : hashed.digest('hex'),
		host_id      : host.id,
		score        : 0,
		relationship : relationship
	};
	
	// create target and save
	return new Promise((resolve, reject) => {
		Target.create(value, (err, target) => {
			if (err)
				return reject(err);
			else {
				console.log(`new target${target_number}(${target.id}) is registered to host(${host.email})`);
				return resolve(target);
			}
		});
	});
};

// TODO: edit it
// update target info
exports.updateTarget = (host, id, name, age, sex, grade, relationship) =>
	new Promise((resolve, reject) => {
		Target
		.findOne({ _id: id })
		.then(target => {
			if (!target) return reject('잘못된 정보입니다.');
			target.name         = name;
			target.age          = age;
			target.sex          = sex;
			target.grade        = grade;
			target.relationship = relationship;
			target.save(err => {
				if (err) return reject(err);
				else     return resolve(target);
			});
		});
	});

// return target(or null) from hashed
exports.getTargetByHashed = (hashed) => {
	if (!hashed) return null;
	console.log(`getTargetByHashed: ${hashed}`);
	return Target.findOne({ hashed: hashed });
};

// TODO: test it
// return target info or null from id
exports.getTargetInfoById = (id) => 
	new Promise((resolve, reject) => {
		Target
		.findOne({ _id: id })
		.then(target => {
			if (!target) return resolve(null);
			return resolve({
				name: target.name,
				age: target.age,
				sex: target.sex,
				grade: target.grade,
				score: target.score
			});
		});
	});

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
// add target's total score
exports.addScore = (req, res) => {
	// find the target
	Target
	.findOne({ hashed: req.body.hashed })
	.then(target => {
		// handle exception
		if (!target) return Res.rerror(res, '잘못된 hashed 값입니다.');

		// save new score
		target.score = target.score + req.body.score;
		target.save(err => {
			if (err) {
				return Res.ruerror(res, err);
			} else {
				return res.json({
					result: 1,
					message: '성공적으로 기록되었습니다.',
					score: target.score
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