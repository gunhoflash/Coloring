const express = require('express');
const mongoose = require('mongoose');

/* controller */
const HostController = require('./controllers/host');
const TargetController = require('./controllers/target');

/* core (will be deprecated) */
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

// middleware
app.all('*', (req, res, next) => {
	let protocol = req.headers['x-forwarded-proto'] || req.protocol;
	let from = `${protocol}://${req.hostname}${req.url}`;
	console.log(`[${req.method} ${req.ip}] ${from}`);
	next();
});

/*
	ROUTE
*/

// /
app.get('/', (req, res) => {
	res.render('index', { target: JSON.stringify(null) });
});

// /register
app.get('/register', (req, res) => {
	res.render('register');
});

// login with hashed url
app.get('/id/:hashed', (req, res) => {
	TargetController
	.getTargetByHashed(req.params.hashed)
	.then(target => {
		if (!target)
			res.redirect('/');
		else
			res.render('index', { target: JSON.stringify(target) });
	});
});

/*
	FUNCTIONS - HOST
*/

app.post('/createHost',     (req, res) => { HostController.createHost(req, res);     });
app.post('/getHostInfo',    (req, res) => { HostController.getHostInfo(req, res);    });
app.post('/registerTarget', (req, res) => { HostController.registerTarget(req, res); });

/*
	FUNCTIONS - TARGET
*/
app.put('/addScore',        (req, res) => { TargetController.addScore(req, res);     });

// render 404, 500
app.use((req, res, next) => { res.status(404).render('error/error', { errorcode: 404 }); });
app.use((req, res, next) => { res.status(500).render('error/error', { errorcode: 500 }); });

// start server
server.listen(port);
console.log(`listen now with port:${port}`);

// self request
selfRequest.init(app);
