angular.module('contatooh').controller('ContatosController', 
	function(Contato, $scope, $resource, $http){


		$scope.contatos = [];
		$scope.empresas = [];		
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


		$scope.ImportarContato = function() {
			
			$http.get('https://api.import.io/store/connector/eef2879d-be57-4ddc-8779-b99a0c540aa9/_query?input=webpage/url:http%3A%2F%2Fguia.radardf.com%2F&&_apikey=8aaa9517a7b04e9799197d959078da53e56dc10400c2a515d765bf108d62e0913aafb9acbbd37ff0ad1f05de84652c334b00d52653ad5cb7faf9d23f2c974aa9b57336807566058c2796fb768ff4132e').success(function(data){

							// Pegando os dados que estão vindo da api
							$scope.filtro = data.results;

							// Imprimindo para simples conferencia
							console.log(data.results.length + $scope.filtro);

							// Percorrendo os dados que foram enviados
							for(i=0; i<data.results.length; i++){

								var jsonContato = {
									"nome":data.results[i]["entrytitle_link/_text"],
									"categoria":data.results[i]["listingcat_links/_text"],
									"observacao":data.results[i]["descrio_description"],
									"email":data.results[i]["lermais_link"],
									"site":data.results[i]["entrytitle_link"],
									"telefone":data.results[i]["listingphone_value"],
									"estado":data.results[i]["listing_value"],
									"cidade":data.results[i]["listing_value"],
									"endereco":data.results[i]["listing_value"]
								};
								console.log('Array do site: ' + data.results[i]);
								//console.log("object: %o", jsonContato)
								$scope.empresas.push(jsonContato);

							}
							//console.log("object: %o", jsonContato)
							console.log("object do array: %o", $scope.empresas)
							

							$http.post("/importacontato", { query: $scope.empresas }).success(function (data) {
								$scope.mensagem = { texto: "Importação ocorreu com sucesso " };
							}).error(function (data) {
								$scope.mensagem = { "texto: ": "Erro na importação" };
							});

						}).error(function (data) { 
							console.log('error0');
						});

		}

		// Nova função para buscar os usuarios na tela inicial do sistema
		$scope.PesquisarContato = function(form) {
			
			var data = form.pBusca.$modelValue;			
			$http.post("/busca", { query: data}).success(function (data) {
                
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