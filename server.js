const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type',
	);
	// Pass to next layer of middleware
	next();
});

const apiRouter = require('./api.js');

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
