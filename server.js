var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./config/passport')();
require('./config/database')(
	'mongodb://heroku_drxf48f5:nslmjl@ds023448.mlab.com:23448/heroku_drxf48f5/contatooh'
);

http.createServer(app).listen(process.env.PORT || 3000, function() {
	console.log('Express Server escutando na porta ' + process.env.PORT || 3000);
});
