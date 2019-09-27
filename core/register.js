const crypto = require('crypto');

let NUMBER_OF_USERS = 0;
let temp_users = [];

// Create and register new user
exports.register = (req, res) => {
	let user = User();
	temp_users.push(user);

	// TODO: save cookie

	// redirect
	res.redirect(`/game/${user.hashed}`);
};

// return new User
User = () => {
	let user_number = NUMBER_OF_USERS++;
	var sha = crypto.createHash('sha1');
	sha.update(`user-${user_number}`);
	var hashed = sha.digest('hex');

 	return {
		user_number: user_number,
		hashed: hashed,
		score: 0
	};
};