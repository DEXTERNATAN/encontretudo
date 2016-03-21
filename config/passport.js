var passport = require('passport');

// Logando com gitHub
var GitHubStrategy = require('passport-github').Strategy;

//Logando com Facebook
var FacebookStrategy = require('passport-facebook').Strategy;

// Fazendo o passport conhecer o model
var mongoose = require('mongoose');

module.exports = function() {

	// Fazendo a ligação entre o model e o passport config
	var Usuario = mongoose.model('Usuario');

	/* FACEBOOK */
	// Strategy Facebook
	passport.use(new FacebookStrategy({

			clientID: '517844815061650',
			clientSecret: 'f88433e17dbf36f0907f1ee5e9079286',
			callbackURL: "https://secure-bayou-39973.herokuapp.com/auth/facebook/callback"

		},
		function(accessToken, refreshToken, profile, cb) {

			/*User.findOrCreate({ facebookId: profile.id }, function (err, usuario) {
				return cb(err, usuario);
			});
			*/

			console.log('profile: ' + profile);

			Usuario.findOrCreate(

				{
					"login": profile.username
				}, {
					"nome": profile.username
				},
				function(erro, usuario) {
					if (erro) {
						console.log(erro);
						return done(erro);
					}
					return cb(erro, usuario);

				});

		}));


	/* GITHUB */
	// Strategy GitHub
	passport.use(new GitHubStrategy({


		// SERVIDOR HEROKU
		clientID: '4e894100d7b987c05124',
		clientSecret: '667d4e6fbfa647b57b1d62f643ab2acd0ad6ce45',
		callbackURL: 'https://secure-bayou-39973.herokuapp.com/auth/github/callback'

	}, function(accessToken, refreshToken, profile, done) {

		Usuario.findOrCreate(

			{
				"login": profile.username
			}, {
				"nome": profile.username
			},
			function(erro, usuario) {
				if (erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);

	}));

	/*
		Chamado apenas UMA vez e recebe o usuário do nosso
		banco disponibilizado pelo callback da estratégia de
		autenticação. Realizará a serialização apenas do
		ObjectId do usuário na sessão.
		*/
	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});


	// Recebe o ObjectId do usuário armazenado na sessão
	// Chamado a CADA requisição
	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});

};
