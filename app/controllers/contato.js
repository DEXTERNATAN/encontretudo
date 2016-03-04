module.exports = function (app) {
	
	var Contato = app.models.contato;
	var controller = {};
	
	controller.listaContatos = function(req, res) {
		
		Contato.find().exec()
		.then(
			function(contatos) {
				res.json(contatos);
			},
			function(erro) {
				console.error(erro)
				res.status(500).json(erro);
			}
			);
	};

	controller.obtemContato = function(req, res) {
		var _id = req.params.id;
		Contato.findById(_id).exec()
		.then(
			
			function(contato) {
				if (!contato) throw new Error("Contato não encontrado");
				res.json(contato)
			},
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
			);
	};

	controller.removeContato = function(req, res) {
		var _id = req.params.id;
		Contato.remove({"_id": _id}).exec()
			.then(
				function(){
					res.end();
				},
				function(erro){
					return console.error(erro);
				}
			);
	};
	
	// Método para pesquisar contatos
	controller.pesquisaContato = function(req, res){
		var data = req.body;
		console.log('data', data);

		var q = data.query;
	
		Contato.find({"nome": {'$regex': q}}).exec()
		.then(function(results){
			res.json(results);
		}, function(){
			res.json({code: 500, mensagem: 'Erro desconhecido'});
		});
		// console.log("Cheguei  - pesquisaContato", req);

		// res.json({ data: 'teste'});
	};


	controller.salvaContato = function(req, res) {
		
		var _id = req.body._id;
		
		if(_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
			.then(
				function(contato) {
					res.json(contato);
				},
				function(erro) {
					console.error(erro)
					res.status(500).json(erro);
				}
				);
		} else {
			console.log("Estou no else");
			Contato.create(req.body)
			.then(
				function(contato) {
					res.status(201).json(contato);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);
				
		};

	};

	return controller;

};