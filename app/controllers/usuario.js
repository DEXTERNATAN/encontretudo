module.exports = function(app) {

	var Usuario = app.models.usuario;
	var controller = {};
	console.log("Cheguei no controller do usuarios");

	// Logar o usuario e autenticar o mesmo
	controller.loginUsuario = function(req, res) {

		// Recebendo o paramentro do controller da view
		var data = req.body;

		// Verificando se o usuario existe na base de dados
		Usuario.find({
				"nome": {
					$regex: new RegExp(data, "i")
				}
			}).exec()
			.then(function(sucesso) {
				res.status(201).json(data);
			}, function(error) {
				res.status(500).json(data);
			});

		// Devolvendo uma respota do servidor
		//res.status(201).json(data);
	};

	// Função para cadastrar o usuario na base de dados
	controller.cadastraUsuario = function(req, res) {

		var data = req.body;
		//console.log("valor: " + data );
		// Imprime o objeto json ou javascript
		//console.log("object: %o", req.body);
		res.status(201).json("object: %o", data);

	};


	return controller;

};
