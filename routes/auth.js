var User = require('../models/user');
module.exports = function(app, passport) {
	// app.post(
	// 	'/login',
	// 	passport.authenticate('local-login', {
	// 		successRedirect: '/profile',
	// 		failureRedirect: '/login',
	// 		failureFlash: true,
	// 	}),
	// );

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', { user: req.user });
	});

	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] }),
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/profile',
			failureRedirect: '/',
		}),
	);

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
}
