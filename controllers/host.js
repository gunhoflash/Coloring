var TargetController = require('./target');
var Res = require('./responseError');
var Host = require('../models/host');

// create(register) a new host with given data(email, ...)
exports.createHost = (req, res) => {

	let email = req.bosy.email;
	let name  = req.bosy.name;
	let age   = req.bosy.age;
	let sex   = req.bosy.sex;

	// handle exception: not enough parameter
	if (!email || !name || !age || !sex)
		return Res.rerror(res, 'not enough parameter');

	// register host
	Host.countDocuments({ email: email }, (err, cnt) => {

		// refused: the email is already being used
		if (cnt > 0)
			return Res.rerror(res, `해당 이메일(${email})은 이미 사용중입니다.`);

		// set properties
		var value = {
			name      : name,
			age       : age,
			sex       : sex,
			email     : email,
			target1_id: null,
			target2_id: null
		};

		// create host and save
		Host.create(value, (err, host) => {
			if (err)
				return Res.ruerror(res, err);
			else
				return res.json({
					result: 1,
					message: `${name}님의 이메일(${email})로 Host 가입이 완료되었습니다.`
				});
		});
	});
};

// create target or change target's info.
exports.manageTarget = (req, res) => {

	var email         = req.body.email;
	var target_number = req.body.target_number;
	var name          = req.body.name;
	var age           = req.body.age;
	var sex           = req.body.sex;
	var grade         = req.body.grade;
	var relationship  = req.body.relationship;

	// handle exception: not enough parameter
	if (!email || !target_number || !name || !age || !sex || !grade)
		return Res.rerror(res, 'not enough parameter');

	// find the host by email
	Host
	.findOne({ email: email })
	.then(host => {

		// handle exception: host not found
		if (!host)
			return Res.rerror(res, 'Host email이 정확하지 않습니다.');

		let target_id = (target_number == 1) ? host.target1_id : host.target2_id;

		if (target_id == null) {
			// create target
			TargetController
			.createTarget(host, target_number, name, age, sex, grade, relationship)
			.then(target => 
				res.json({
					result: 1,
					message: `${target_number}번째 Target을 정상적으로 등록했습니다.`,
					target: target
				})
			)
			.catch(err => Res.ruerror(res, err));
		} else {
			// change info of target
			TargetController
			.updateTarget(host, target_id, name, age, sex, grade, relationship)
			.then(target =>
				res.json({
					result: 1,
					message: `성공적으로 저장되었습니다.`,
					target: target
				})
			)
			.catch(err => Res.ruerror(res, err));
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

// get host's info with email and name
exports.getHostInfo = (req, res) => {
	
	let email = req.body.email; 
	let name = req.body.name;
	
	// handle exception: not enough parameter
	if (!email || !name)
		return Res.rerror(res, 'not enough parameter');

	// find the host
	Host
	.findOne({ email: email, name: name })
	.then(host => {

		// handle exception: host not found
		if (!host) return Res.rerror(res, 'host not found');

		let host_info = {
			name                 : host.name,
			age                  : host.age,
			sex                  : host.sex,
			email                : host.email,
			target1              : null,
			target2              : null
		};

		// find the targets
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
	})
	.catch(err => Res.ruerror(res, err));
};