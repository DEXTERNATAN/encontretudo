var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database')('mongodb://localhost/contatooh');

http.createServer(app).listen(process.env.PORT || 5000, function() {
	console.log('Express Server escutando na porta ' + process.env.PORT || 5000);
});

/*var http = require('http');
var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});*/
