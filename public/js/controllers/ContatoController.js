angular.module('contatooh').controller('ContatoController',
	function($scope, $resource, $routeParams, Contato) {
		if($routeParams.contatoId) {

			  		// Pagination
			  		$scope.currentPage = 1;
			  		$scope.pageSize = 5;
			  		
			  		Contato.get({id: $routeParams.contatoId},
			  			function(contato) {
			  				$scope.contato = contato;
			  			},
			  			function(erro) {
			  				$scope.mensagem = {
			  					texto: 'Contato não existe. Novo contato.'
			  				};
			  			}
			  			);
			  	} else {
			  		$scope.contato = {};
			  	}

			  	$scope.contato = new Contato();
			  	
			  	$scope.salva = function() {
			  		$scope.contato.$save()
			  		.then(function() {
			  			$scope.mensagem = {texto: 'Salvo com sucesso'};
					// limpa o formulário
					$scope.contato = new Contato();
				})
			  		.catch(function(erro) {
			  			$scope.mensagem = {texto: 'Não foi possível salvar'};
			  		});
			  	};
			  });