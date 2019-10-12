var TargetController = require('./target');
var Host = require('../models/host');

exports.createHost = (req, res) => {
	Host.countDocuments({
		email: req.body.email
	}, (err, cnt) => {

		// the email is already being used
		if (cnt > 0) {
			return res.json({
				result: -1,
				message: '이미 존재하는 이메일입니다.'
			});
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
				console.error(err);
				return res.json({
					result: 0,
					message: '오류가 발생하였습니다.',
					error: err.message
				});
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
			return res.json({
				result: -1,
				message: 'Host email이 정확하지 않습니다.'
			});
		}

		// check the number of target
		var target_number;
		     if (host.target1_id == null) target_number = 1;
		else if (host.target2_id == null) target_number = 2;
		else {
			// the host already has 2 targets
			console.log(`the host(${email}) already has 2 targets`);
			return res.json({
				result: -1,
				message: '더이상 Target을 추가할 수 없습니다.'
			});
		}

		// create target and register
		TargetController
		.createTarget(req, res, host, target_number)
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
		}, err => {
			// unknown error
			console.log(err);
			return res.json({
				result: 0,
				message: '알 수 없는 에러가 발생했습니다.'
			});
		});
	})
	.catch(console.log);
};

exports.emailVerification = (email, res) => {
	Host
	.findOne({
		email: email
	})
	.then()
	.catch(console.log);
};

exports.getHostInfo = () => {

};
