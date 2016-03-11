// Verifica se o usuario está logado
function verificaAutenticacao(req, res, next) {
if (req.isAuthenticated()) {
return next();
} else {
res.status('401').json('Não autorizado');
}
}

module.exports = function(app){
	
	var controller = app.controllers.usuario;
	
	console.log("Cheguei no route do suario");

	app.route('/cadusuario')
	.post(controller.cadastraUsuario);

	app.route('/logar')
	.post(controller.loginUsuario);
	
};