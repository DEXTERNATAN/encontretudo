var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ObjectID de algum contato existente
var _idProcurado = new ObjectID('53ee689e89bd201218944bba');

MongoClient.connect(


		MongoClient.connect(

			// MAQUINA SERVIDOR HEROKU
			'mongodb://encontretudo:encontretudo@ds023448.mlab.com:23448/heroku_drxf48f5?authMode=scram-sha1',
			function(erro, db) {
				if (erro) throw err;
				db.collection('contatos').findOne({
						_id: _idProcurado
					},
					function(erro, contato) {
						if (erro) throw err;
						console.log(contato);
					}
				);
			}
		);
