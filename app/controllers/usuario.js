module.exports = function (app) {
	
	var Usuario = app.models.usuario;
	var controller = {};
	console.log("Cheguei no controller do usuarios");	

	controller.cadastraUsuario = function(req, res){
		
		var data = req.body;
		//console.log("valor: " + data );
		//console.log("object: %o", req.body);
		//res.status(201).json("object: %o", data);
		Usuario.create(data)
			.then(
				function(data) {
					res.status(201).json(data);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);		

	}

	
	return controller;

};