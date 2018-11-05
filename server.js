const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'frontend/dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
	session({
		secret: 'anystringoftext',
		saveUninitialized: true,
		resave: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const db = require('./db.js');
// const authRouter = require('./routes/auth.js')(app, passport);
// app.use('/auth', authRouter);
const apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);

const port = process.env.PORT || 30001;
app.listen(port, () => {
	console.log(`Listening on port  http://localhost:${port}`);
});
