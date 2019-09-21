const express = require('express');
const request = require('request');
const selfRequest = require('./selfRequest');
const app = express();

var server = require('http').createServer(app);
var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.locals.pretty = true;

selfRequest.init('https://nodementia.herokuapp.com/', app);

// /
app.get('/', (req, res) => {
	console.log('/');
	res.render('index');
});

// start
server.listen(port);
console.log(`listen now with port:${port}`);