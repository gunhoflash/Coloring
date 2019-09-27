const express = require('express');
const request = require('request');
const mongoose = require('mongoose');

const register = require('./core/register');
const selfRequest = require('./core/selfRequest');

const app = express();

// create a server
var server = require('http').createServer(app);
var port = process.env.PORT || 5000;

// connect mongoDB
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URI || 'mongodb://heroku_4g3dqxz6:8t4s8scntjm72gfbrrs0qp92qn@ds235401.mlab.com:35401/heroku_4g3dqxz6';
mongoose
	.connect(uristring, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log(`Succeeded connected to : ${uristring}`))
	.catch(err => console.log(`ERROR connecting to : ${uristring}. ${err}`));

// settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.locals.pretty = true;

// start server
server.listen(port);
console.log(`listen now with port:${port}`);

// middleware
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
