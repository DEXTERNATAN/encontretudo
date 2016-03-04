angular.module('contatooh').controller('ContatosController', 
	function(Contato, $scope, $http){

		$scope.contatos = [];		
		$scope.filtro = '';
		$scope.mensagem = {texto: ''};

		function buscaContatos() {
			Contato.query(
				function(contatos){
					
					$scope.contatos = contatos;
					$scope.mensagem = {};
				},
				function(erro){
					console.log(erro);
					$scope.mensagem = {
						texto: 'Não foi possível obter a lista'
					};
				}
				);	
		}

		$scope.remove = function(contato){
			Contato.delete({id: contato._id});
		}

		// Função para carregar contatos na inicialização do projeto.
		buscaContatos();

		$scope.remove = function(contato) {
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					$scope.mensagem = {
						texto: 'Não foi possível remover o contato'
					};
					console.log(erro);
				}
				);
		};

		// Nova função para buscar os usuarios na tela inicial do sistema
		$scope.PesquisarContato = function(form) {
			
			var data = form.pBusca.$modelValue;
			
			$http.post("/busca", { query: data}).success(function (data) {
                //$scope.PostDataResponse = data;
                if (!data.length)
                	$scope.mensagem = {
						texto: "error"
					};

				if (data.length)
					$scope.mensagem = {
						texto: data
					};
					$scope.contatos = data;
					
            })
            .error(function (data) {
                $scope.mensagem = { "texto: ": data.mensagem };
            });

		};
	});