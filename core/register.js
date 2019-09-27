const crypto = require('crypto');

let NUMBER_OF_USERS = 0;
let temp_users = [];

// Create and register new user
exports.register = (req, res) => {

	// create new user
	let user = User(req.body);
	temp_users.push(user);

	// TODO: save cookie

	// redirect
	res.redirect(`/id-${user.hashed}`);
};

// return new User
User = data => {
	let user_number = NUMBER_OF_USERS++;
	var sha = crypto.createHash('sha1');
	sha.update(`user-${user_number}`);
	var hashed = sha.digest('hex');

 	return {
		user_number:      user_number,
		hashed:           hashed,
		score:            0,

		host_name:        data.host_name,
		host_age:         data.host_age,
		host_sex:         data.host_sex,
		host_email:       data.host_email,
		host_relatonship: data.host_relatonship,

		target_name:      data.target_name,
		target_age:       data.target_age,
		target_sex:       data.target_sex,
		target_grade:     data.target_grade
	};
};