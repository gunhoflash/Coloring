var TargetController = require('./target');
var Res = require('./responseError');
var Host = require('../models/host');

exports.createHost = (req, res) => {
	Host.countDocuments({
		email: req.body.email
	}, (err, cnt) => {

		// the email is already being used
		if (cnt > 0) {
			return Res.rerror(res, '이미 존재하는 이메일입니다.');
		}

		// set properties
		var value = {
			name                 : req.body.name,
			age                  : req.body.age,
			sex                  : req.body.sex,
			email                : req.body.email,
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
					message: 'Host 가입이 정상적으로 완료되었습니다.'
				});
			}
		});
	});
};

// register a new target to host
exports.registerTarget = (req, res) => {
	var email = req.body.email;
	console.log(`registerTarget: ${email}`);

	// find host by email
	Host
	.findOne({ email: email })
	.then(host => {

		// host not found
		if (!host) {
			console.log(`host(${email}) not found`);
			return Res.rerror(res, 'Host email이 정확하지 않습니다.');
		}

		// check the number of target
		var target_number;
		     if (host.target1_id == null) target_number = 1;
		else if (host.target2_id == null) target_number = 2;
		else {
			// the host already has 2 targets
			console.log(`the host(${email}) already has 2 targets`);
			return Res.rerror(res, '더이상 Target을 추가할 수 없습니다.');
		}

		// create target and register
		TargetController
		.createTarget(host, target_number, req.body.name, req.body.age, req.body.sex, req.body.grade)
		.then(target => {
			// target created

			// register target to host
			if (target_number == 1) {
				host.target1_id           = target.id;
				host.target1_relationship = req.body.relationship;
			} else {
				host.target2_id           = target.id;
				host.target2_relationship = req.body.relationship;
			}
			host.save(err => {
				if (err) console.log(err);
			});

			console.log(`target(${target.id}) is registered to host(${email})`);
			return res.json({
				result: 1,
				message: 'Target을 정상적으로 등록했습니다.'
			});
		}, err => Res.ruerror(res, err));
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
	if (!email || !name) return Res.rerror('not enough parameter');

	Host
	.findOne({ email: email, name: name })
	.then(host => {

		// handle exception: host not found
		if (!host) return Res.rerror('host not found');

		res.json({
			result               : 1,
			name                 : host.name,
			age                  : host.age,
			sex                  : host.sex,
			email                : host.email,
			target1              : TargetController.getTargetInfoById(host.target1_id),
			target2              : TargetController.getTargetInfoById(host.target2_id)
		});
	}, err => Res.ruerror(res, err));
};