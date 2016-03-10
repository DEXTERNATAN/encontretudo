// Verifica se o usuario está logado
function verificaAutenticacao(req, res, next) {
if (req.isAuthenticated()) {
return next();
} else {
res.status('401').json('Não autorizado');
}
}

module.exports = function(app){
	
	var controller = app.controllers.contato;
	
	console.log("Cheguei no controller" + controller);

	app.route('/listageral')
	.get(controller.listaContatos);

	app.route('/busca')
	.get(controller.listaContatos)
	.post(controller.pesquisaContato);

	app.route('/importacontato')
	.get(controller.listaContatos)
	.post(controller.ImportarContato);

	app.route('/cadastro_usuario')
	.get(controller.cadastraUsuario);

	app.route('/login')
	.get(controller.listaContatos);
	
	app.route('/contatos')
	.get(controller.listaContatos)
	.post(controller.salvaContato);
	
	app.route('/contatos/:id')
	.get(controller.obtemContato)
	.delete(controller.removeContato);

	app.route('/cadastro_usuario/:id')
	.get(controller.obtemContato)
	.delete(controller.removeContato);


};