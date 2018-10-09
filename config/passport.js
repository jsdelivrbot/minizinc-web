const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');
const configAuth = require('./auth');

passport.use(
	new GoogleStrategy({
		clientID: configAuth.clientID,
		clientSecret: configAuth.clientSecret,
		callbackURL: configAuth.callbackURL,
	}),
);
