var User = require('../models/user.js');

exports.signup = (req, res) => {
	User.countDocuments({
		host_email: req.body.host_email
	}, (err, cnt) => {
		if (cnt > 0) {
			return res.json({
				result: -1,
				message: '이미 존재하는 이메일입니다.'
			});
		}

		// create user
		var user = new User();
		
		user.score             = 0;
		
		user.host_name         = req.body.host_name;
		user.host_age          = req.body.host_age;
		user.host_sex          = req.body.host_sex;
		user.host_email        = req.body.host_email;
		user.host_relationship = req.body.host_relationship;
		
		user.target_name       = req.body.target_name  || null;
		user.target_age        = req.body.target_age   || null;
		user.target_sex        = req.body.target_sex   || null;
		user.target_grade      = req.body.target_grade || null;
		
		user.hashed            = user.hash(req.body.host_email);

		user.save(err => {
			if (err) {
				console.error(err);
				return res.json({
					result: 0,
					message: '오류가 발생하였습니다.',
					error: err.message
				});
			}

			return res.json({
				result: 1,
				message: '가입이 정상적으로 완료되었습니다.'
			});
		});
	});
};

exports.getUser = (hashed, res) => {
	console.log('getUser');
	return User
	.findOne({
		hashed: hashed
	})
	.then(user => {
		if (user)
			console.log(`getUser success: ${hashed}`);
		else
			console.log(`getUser fail: ${hashed}`);
		return user;
	})
	.catch(console.log);
};

exports.emailVerification = (host_email, res) => {
	User
	.findOne({
		host_email: host_email
	})
	.then()
	.catch(console.log);
};