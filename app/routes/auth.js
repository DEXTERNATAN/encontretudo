var passport = require('passport');

module.exports = function(app) {

	// FACEBOOK
	app.get('/auth/facebook',
		passport.authenticate('facebook'));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
    		// Successful authentication, redirect home.
    		res.redirect('/');
	});

	// GITHUB
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback',
		passport.authenticate('github', {
			successRedirect: '/'
		}));

	app.get('/logout', function(req, res) {
		req.logOut(); // exposto pelo passport
		res.redirect('/#/login');
	});
	
}