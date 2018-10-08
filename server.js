const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		secret: 'anystringoftext',
		saveUninitialized: true,
		resave: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/auth')(app, passport);

const port = process.env.PORT || 3000;

const apiRouter = require('./api.js');

app.use(cors());

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
