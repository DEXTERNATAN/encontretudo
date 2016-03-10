angular.module('contatooh', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $httpProvider) {

	// Chamando o interceptador para capturar requisições ajax
	$httpProvider.interceptors.push('meuInterceptor');

	$routeProvider.when('/contatos', {
		templateUrl: 'partials/contatos.html',
		controller: 'ContatosController'
	});

	$routeProvider.when('/contato/:contatoId', {
		templateUrl: 'partials/contato.html',
		controller: 'ContatoController'
	});

	$routeProvider.when('/contato', {
		templateUrl: 'partials/contato.html',
		controller: 'ContatoController'
	});
	
	// Tela que exibe os resultados da busca
	$routeProvider.when('/pesquisacontato', {
		templateUrl: 'partials/pesquisacontato.html',
		controller: 'ContatosController'
	});

	// Tela que exibe os resultados da busca
	$routeProvider.when('/importacontato', {
		templateUrl: 'partials/importar.html',
		controller: 'ContatosController'
	});

	// Tela que exibe os resultados da busca
	$routeProvider.when('/listageral', {
		templateUrl: 'partials/listageral.html',
		controller: 'ContatoController'
	});

	// Tela que exibe o botao de busca e é a pagina inicial do site
	$routeProvider.when('/lista_geral_resultado', {
		templateUrl: 'partials/lista_geral_resultado.html',
		controller: 'ContatoController'
	});

	$routeProvider.when('/cadastro_usuario', {
		templateUrl: 'partials/cadastro_usuario.html',
		controller: 'UsuariosController'
	});

	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'ContatoController'
	});

	$routeProvider.when('/auth', {
		templateUrl: 'partials/auth.html'
	});

	$routeProvider.otherwise({redirectTo: '/pesquisacontato'});

});