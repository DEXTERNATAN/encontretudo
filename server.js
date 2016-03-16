var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database')(
	
	// MAQUINA LOCAL
	'mongodb://localhost/contatooh'
	
	// MAQUINA DO SERVIDOR HEROKU
	//'mongodb://encontretudo:encontretudo@ds023448.mlab.com:23448/heroku_drxf48f5?authMode=scram-sha1'
);

http.createServer(app).listen(process.env.PORT || 3000, function() {
	console.log('Express Server escutando na porta ' + process.env.PORT || 3000);
});

// OLDS
/*var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});
*/
/*var http = require('http');
var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});*/

