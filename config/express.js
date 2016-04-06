// config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Métodos de autenticação e sessão
var session = require('express-session');
var passport = require('passport');


module.exports = function() {
	var app = express();

// configuração de ambiente
app.set('port',3000);

// middleware
app.use(express.static('./public'));
app.use(cookieParser());
app.use(session(
	{ secret: 'homem avestruz',
	resave: true,
	saveUninitialized: true
}
));
app.use(passport.initialize());
app.use(passport.session());

	// setando a variavél de ambiente para usar o engine template
	app.set('view engine', 'ejs');
	app.set('views','./app/views');

	// Adiciionando o midlleware body parser
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());


// Implantando a função load do módulo load-express
load('models', {cwd: 'app'})
.then('controllers')
.then('routes')
.into(app);

console.log("teste");

return app;
}