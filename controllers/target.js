var Res = require('./responseError');
var Target = require('../models/target');
var Crypto = require('crypto');

// create a new target
exports.createTarget = (host, target_number, name, age, sex, grade, relationship) => {

	// get hash from email and target-number
	var hashed = Crypto.createHash('sha1').update(`target${target_number}${host.email}`);

	// set properties
	var value = {
		name         : name,
		age          : age,
		sex          : sex,
		grade        : grade,
		hashed       : hashed.digest('hex'),
		host_id      : host.id,
		level        : 1,
		score        : 4,
		relationship : relationship
	};
	
	// create target and save
	return new Promise((resolve, reject) => {
		Target.create(value, (err, target) => {
			if (err)
				return reject(err);
			else {
				if (target_number == 1) host.target1_id = target.id;
				if (target_number == 2) host.target2_id = target.id;
				host.save(err => {
					if (err) return reject(err);
					else {
						console.log(`new target${target_number}(${target.id}) is registered to host(${host.email})`);
						return resolve(target);
					}
				});
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
				name         : target.name,
				age          : target.age,
				sex          : target.sex,
				grade        : target.grade,
				hashed       : target.hashed,
				level        : target.level,
				score        : target.score,
				relationship : target.relationship
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
// add score and increase level
exports.addScore = (req, res) => {
	// find the target
	Target
	.findOne({ hashed: req.body.hashed })
	.then(target => {

		let new_score;
		let new_level;
		let level_up;

		console.log(req.body);
		if (!target) {
			// handle exception: temp user
			new_score = parseInt(req.body.score_before) + parseInt(req.body.score);
			level_up = Math.floor(new_score / 5);
			new_level = parseInt(req.body.level_before) + level_up;
		} else {
			// target user
			new_score = target.score + parseInt(req.body.score);
			level_up = Math.floor(new_score / 5);
			new_level = target.level + level_up;
		}
		new_score %= 5;
		new Promise((resolve, reject) => {
			if (!target) return resolve();
			// save new score
			target.score = new_score;
			target.level = new_level;
			return target.save(err => {
				if (err) return reject(err);
				else return resolve();
			});
		})
		.then(() => {
			return res.json({
				result: 1,
				message: '성공적으로 기록되었습니다.',
				level_up: level_up,
				level: new_level,
				score: new_score
			});
		})
		.catch(err => Res.ruerror(res, err));
	})
	.catch(err => Res.ruerror(res, err));
};

// log all hashed urls for test
exports.logAllHashedURL = () => {
	Target
	.find()
	.then(targets => {
		targets.forEach((target, index) => {
			console.log(`target ${index}: ${target.hashed}, host: ${target.host_id}`);
		});
	});
};