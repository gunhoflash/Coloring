var TargetController = require('./target');
var Res = require('./responseError');
var Host = require('../models/host');

exports.createHost = (req, res) => {

	let email = req.bosy.email;
	let name = req.bosy.name;
	let age = req.bosy.age;
	let sex = req.bosy.sex;

	// handle exception: not enough parameter
	if (!email || !name || !age || !sex) return Res.rerror(res, 'not enough parameter');

	Host.countDocuments({
		email: email
	}, (err, cnt) => {

		// the email is already being used
		if (cnt > 0) {
			return Res.rerror(res, `해당 이메일(${email})은 이미 사용중입니다.`);
		}

		// set properties
		var value = {
			name                 : name,
			age                  : age,
			sex                  : sex,
			email                : email,
			target1_id           : null,
			target2_id           : null,
			target1_relationship : null,
			target2_relationship : null
		};

		// create host and save
		Host.create(value, (err, host) => {
			if (err) {
				return Res.ruerror(res, err);
			} else {
				return res.json({
					result: 1,
					message: `${name}님의 Host 가입이 정상적으로 완료되었습니다. 등록하신 이메일 주소는 ${email}입니다.`
				});
			}
		});
	});
};

// create/change target
exports.manageTarget = (req, res) => {
	var email = req.body.email;
	var target_number = req.body.target_number;
	var name = req.body.name;
	var age = req.body.age;
	var sex = req.body.sex;
	var grade = req.body.grade;

	console.log(`manageTarget: ${email}`);

	// find host by email
	Host
	.findOne({ email: email })
	.then(host => {

		// host not found
		if (!host) {
			console.log(`host(${email}) not found`);
			return Res.rerror(res, 'Host email이 정확하지 않습니다.');
		}

		if (target_number == 1) {
			if (host.target1_id == null) {
				// create target1
				TargetController
				.createTarget(host, 1, name, age, sex, grade)
				.then(target => {
					// target created
					// register target to host
					host.target1_id           = target.id;
					host.target1_relationship = req.body.relationship;
					host.save(err => {
						if (err) console.log(err);
					});

					console.log(`target1(${target.id}) is registered to host(${email})`);
					return res.json({
						result: 1,
						message: `${target_number}번째 Target을 정상적으로 등록했습니다.`
					});
				}, err => Res.ruerror(res, err));
			} else {
				// change info of target1
				TargetController
				.updateTarget(host.target1_id, name, age, sex, grade)
				.then(message => 
					res.json({
						result: 1,
						message: message
					})
				)
				.catch(err => Res.ruerror(res, err));
			}
		} else if (target_number == 2) {
			if (host.target2_id == null) {
				// create target2
				TargetController
				.createTarget(host, 2, name, age, sex, grade)
				.then(target => {
					// target created
					// register target to host
					host.target2_id           = target.id;
					host.target2_relationship = req.body.relationship;
					host.save(err => {
						if (err) console.log(err);
					});
	
					console.log(`target2(${target.id}) is registered to host(${email})`);
					return res.json({
						result: 1,
						message: `${target_number}번째 Target을 정상적으로 등록했습니다.`
					});
				}, err => Res.ruerror(res, err));
			} else {
				// change info of target2
				TargetController
				.updateTarget(host.target2_id, name, age, sex, grade)
				.then(message => 
					res.json({
						result: 1,
						message: message
					})
				)
				.catch(err => Res.ruerror(res, err));
			}
		} else {
			// TODO: edit it
			// handle exception: invalid target_number
			return Res.rerror(res, 'invalid target number');
		}
	})
	.catch(err => Res.ruerror(res, err));
};

// TODO: make a new function to unregister target of host

// TODO: edit it
exports.emailVerification = (email, res) => {
	Host
	.findOne({
		email: email
	})
	.then()
	.catch(console.log);
};

// TODO: test it
exports.getHostInfo = (req, res) => {
	
	let email = req.body.email; 
	let name = req.body.name;
	
	// handle exception: not enough parameter
	if (!email || !name) return Res.rerror(res, 'not enough parameter');

	Host
	.findOne({ email: email, name: name })
	.then(host => {

		// handle exception: host not found
		if (!host) return Res.rerror(res, 'host not found');

		let host_info = {
			name   : host.name,
			age    : host.age,
			sex    : host.sex,
			email  : host.email,
			target1: null,
			target2: null,
			target1_relationship: host.target1_relationship,
			target2_relationship: host.target2_relationship
		};

		Promise
		.all([
			TargetController.getTargetInfoById(host.target1_id),
			TargetController.getTargetInfoById(host.target2_id)
		])
		.then(([target1, target2]) => {
			host_info.target1 = target1;
			host_info.target2 = target2;
		})
		.then(() =>
			res.json({
				result: 1,
				host_info: host_info
			})
		);
	}, err => Res.ruerror(res, err));
};