const express = require('express');
const request = require('request');
const register = require('./core/register');
const selfRequest = require('./core/selfRequest');
const app = express();

var server = require('http').createServer(app);
var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.locals.pretty = true;

app.use(express.urlencoded());
app.use(express.json());

// start
server.listen(port);
console.log(`listen now with port:${port}`);

app.all('*', (req, res, next) => {
	let protocol = req.headers['x-forwarded-proto'] || req.protocol;
	let from = `${protocol}://${req.hostname}${req.url}`;
	console.log(`[${req.method} ${req.ip}] ${from}`);
	next();
});

// /
app.get('/', (req, res) => {
	console.log('/');
	res.render('index');
});

// /register
app.get('/register', (req, res) => {
	console.log('/register');
	res.render('register');
});

// /register
app.get(/id-*/, (req, res) => {
	console.log('/id');
	res.render('index');
});
// below codes is for test

// /register
app.post('/register', (req, res) => {
	console.log('[POST] /register');
	register.register(req, res);
});

selfRequest.init('https://nodementia.herokuapp.com/', app);
