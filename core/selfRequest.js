const request = require('request');

const SELF_REQUEST_JSON = {	result: 1 };
let intervalObj;

exports.init = app => {

	// self-request
	app.get('/selfRequest', (req, res) => {
		res.json(SELF_REQUEST_JSON);
	});

	// start self-request
	app.get('/selfRequestStart', (req, res) => {
		intervalObj = setInterval(() => {
			request(`https://nodementia.herokuapp.com/selfRequest`,  (error, response, body) => {});
		}, 900000);
		res.json(SELF_REQUEST_JSON);
	});

	// end self-request
	app.get('/selfRequestEnd', (req, res) => {
		// TODO: allow only adminthis is only allowed
		clearInterval(intervalObj);
		res.json(SELF_REQUEST_JSON);
	});

};