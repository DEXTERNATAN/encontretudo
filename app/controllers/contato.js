module.exports = function (app) {
	
	var Contato = app.models.contato;
	var controller = {};
	
	// Lista os contatos de forma geral
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

	// Traz o contato pelo id
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

	// Remove o contato pelo id
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
	
	// Método para pesquisar contatos pelo nome especifico
	controller.pesquisaContato = function(req, res){

		var data = req.body;
		var q = data.query;
	
		Contato.find({"nome": {'$regex': q}}).exec()
		.then(function(results){
			res.json(results);
		}, function(){
			res.json({code: 500, mensagem: 'Erro desconhecido'});
		});

		//res.json({ data: "teste"});

	};

	// Método para Adicionar contatos importando de uma base diferente para dentro do site
	controller.ImportarContato = function(req, res){
		
		// Recebendo os dados do formulario para fazer o cadastro
		var data = req.body;
		var q = data.query;

		/* Falta fazer */
		// Fazer validação dos dados antes de inserir , ou seja,
		// Verificar se o cadastro do estabelecimento já existe cadastrado no sistema

		// Cadastrando o usuario
		Contato.create(q)
			.then(
				function(contato) {
					res.status(201).json(q);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);		

		//res.json({ data: q});

	};

	// Metodo para registrar um contato no banco de dados
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