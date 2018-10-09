const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');
const configAuth = require('./auth');

passport.use(
	new GoogleStrategy(
		{
			clientID: configAuth.clientID,
			clientSecret: configAuth.clientSecret,
			callbackURL: configAuth.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				// User.findOne({ 'google.id': profile.id }, function(err, user) {
				// 	if (err) return done(err);
				// 	if (user) return done(null, user);
				// 	else {
				// 		const newUser = new User();
				// 		newUser.google.id = profile.id;
				// 		newUser.google.token = accessToken;
				// 		newUser.google.name = profile.displayName;
				// 		newUser.google.email = profile.emails[0].value;
				// 		newUser.save(function(err) {
				// 			if (err) throw err;
				// 			return done(null, newUser);
				// 		});
				// 		console.log(profile);
				// 	}
				// });
			});
		}
	)
);
