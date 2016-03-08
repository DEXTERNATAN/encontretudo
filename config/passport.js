var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

// Fazendo o passport conhecer o model
var mongoose = require('mongoose');

module.exports = function() {

	// Fazendo a ligação entre o model e o passport config
	var Usuario = mongoose.model('Usuario');

	// código anterior omitido
	passport.use(new GitHubStrategy({

		// MAQUINA LOCAL
		//clientID: 'b360479ac66dee498617',
		//clientSecret: '478dedcba8079a4f85dab99c8d24f77ff36ca045',
		//callbackURL: 'http://localhost:3000/auth/github/callback'

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
