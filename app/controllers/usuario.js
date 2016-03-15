module.exports = function(app) {

	var Usuario = app.models.Usuario;
	var controller = {};
	console.log("Cheguei no controller do usuarios");

	// Logar o usuario e autenticar o mesmo
	controller.loginUsuario = function(req, res) {

		// Recebendo o paramentro do controller da view
		var data = req.body;

		Usuario.find().exec()
			.then(
				function(data) {
					res.json(data);
				},
				function(erro) {
					console.error(erro)
					res.status(500).json(erro);
				}
			);
		// Verificando se o usuario existe na base de dados

		// Devolvendo uma respota do servidor
		res.status(201).json("Usuario: " + Usuario);
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
