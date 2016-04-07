angular.module('contatooh').controller('ContatosController',
	function(Contato, $scope, $resource, $http,  $timeout, ngProgressFactory, $rootScope, $modal, $location, $log) {

		$scope.contatos = [];
		$scope.teste = [];
		$scope.empresas = [];
		$scope.filtro = '';
		$scope.mensagem = { texto: '' };
		// Loading
		$scope.loading = false;
		// Sort Table
		$scope.sortType     = 'nome'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.searchFish   = '';     // set the default search/filter term
  		// Pagination
  		$scope.currentPage = 1;
  		$scope.pageSize = 5;

  		// Progress
  		$rootScope.$on("$routeChangeStart", function () {
  			$rootScope.progressbar = ngProgressFactory.createInstance();
  			$rootScope.progressbar.start();

  		});

  		$rootScope.$on("$routeChangeSuccess", function () {
  			$rootScope.progressbar.complete();
  			/*$templateCache.removeAll();*/
  		});


  		function buscaContatos() {
  			Contato.query(
  				function(contatos) {

  					$scope.contatos = contatos;
  					$scope.mensagem = {};
  				},
  				function(erro) {
  					console.log(erro);
  					$scope.mensagem = {
  						texto: 'Não foi possível obter a lista'
  					};
  				}
  				);
  		}

  		$scope.remove = function(contato) {
  			Contato.delete({
  				id: contato._id
  			});
  		}

		// Função para carregar contatos na inicialização do projeto.
		buscaContatos();

		$scope.remove = function(contato) {
			Contato.delete({
				id: contato._id
			},
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


			// Busca dados do Foursquare

			// Carregando as cafeterias do gama
			//$http.get('https://api.import.io/store/connector/2c9832c8-2b5a-4b33-b4bb-06781e0a028b/_query?input=webpage/url:https%3A%2F%2Fpt.foursquare.com%2Fexplore%3Fmode%3Durl%26near%3DGama%252C%2520DF%252C%2520Brasil%26nearGeoId%3D72057594041390608%26q%3DCaf%25C3%25A9&&_apikey=8aaa9517a7b04e9799197d959078da53e56dc10400c2a515d765bf108d62e0913aafb9acbbd37ff0ad1f05de84652c334b00d52653ad5cb7faf9d23f2c974aa9b57336807566058c2796fb768ff4132e').success(function(data){

			// Carregando a categoria de alimentação
			//$http.get('https://api.import.io/store/connector/203fa8de-aebe-46e2-bca2-f4bff1dd3df1/_query?input=webpage/url:https%3A%2F%2Fpt.foursquare.com%2Fexplore%3Fmode%3Durl%26near%3DGama%252C%2520DF%252C%2520Brasil%26nearGeoId%3D72057594041390608%26q%3DAlimenta%25C3%25A7%25C3%25A3o&&_apikey=8aaa9517a7b04e9799197d959078da53e56dc10400c2a515d765bf108d62e0913aafb9acbbd37ff0ad1f05de84652c334b00d52653ad5cb7faf9d23f2c974aa9b57336807566058c2796fb768ff4132e').success(function(data){
			// Carregando categorias de compras Gama-DF
			$http.get(
				'https://api.import.io/store/connector/b52d5c4c-34b1-447a-a5be-fad1befdd96f/_query?input=webpage/url:https%3A%2F%2Fpt.foursquare.com%2Fexplore%3Fcat%3Dshops%26mode%3Durl%26near%3DGama%252C%2520DF%252C%2520Brasil%26nearGeoId%3D72057594041390608&&_apikey=8aaa9517a7b04e9799197d959078da53e56dc10400c2a515d765bf108d62e0913aafb9acbbd37ff0ad1f05de84652c334b00d52653ad5cb7faf9d23f2c974aa9b57336807566058c2796fb768ff4132e'
				).success(function(data) {

				// Pegando os dados que estão vindo da api
				$scope.filtro = data.results;

				// Imprimindo para simples conferencia
				console.log(data.results.length + $scope.filtro);

				// Percorrendo os dados que foram enviados
				for (i = 0; i < data.results.length; i++) {

					var jsonContato = {
						"nome": data.results[i]["venuename_link/_text"],
						"categoria": "Alimentação",
						"observacao": data.results[i]["detail_content"],
						"email": "alimentação" + i + "@gmail.com",
						"site": data.results[i]["venuename_link"],
						"telefone": "9999-9999",
						"estado": data.results[i]["venueaddress_value"],
						"cidade": data.results[i]["venueaddress_value"],
						"endereco": data.results[i]["venueaddress_value"]
					};
					console.log('Array do site: ' + data.results[i]);
					//console.log("object: %o", jsonContato)
					$scope.empresas.push(jsonContato);

				}
				//console.log("object: %o", jsonContato)
				console.log("object do array: %o", $scope.empresas)


				$http.post("/importacontato", {
					query: $scope.empresas
				}).success(function(data) {
					$scope.mensagem = {
						texto: "Importação ocorreu com sucesso " + data
					};
				}).error(function(data) {
					$scope.mensagem = {
						"texto: ": "Erro na importação"
					};
				});

			}).error(function(data) {
				console.log('error0');
			});



			// Busca dados do guia.radardf
			/*			$http.get('https://api.import.io/store/connector/eef2879d-be57-4ddc-8779-b99a0c540aa9/_query?input=webpage/url:http%3A%2F%2Fguia.radardf.com%2F&&_apikey=8aaa9517a7b04e9799197d959078da53e56dc10400c2a515d765bf108d62e0913aafb9acbbd37ff0ad1f05de84652c334b00d52653ad5cb7faf9d23f2c974aa9b57336807566058c2796fb768ff4132e').success(function(data){

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
									*/



								}

/*								$scope.status = 'Not started';
								$scope.loading = false;

								$scope.upload = function() {
									$scope.loading = true;
        // Simulating a http request with a timeout
        $timeout(function(){ 
        	$scope.status = "Finished";
        	$scope.loading = false;
        },3000);
    }
    */

		// Nova função para buscar os usuarios na tela inicial do sistema
		$scope.PesquisarContato = function(form) {
			$scope.loading = true;
			var data = form.pBusca.$modelValue;
			$http.post("/busca", {
				query: data
			}).success(function(data) {

				if (!data.length)
					$scope.mensagem = {
						texto: "error"
					};

					if (data.length)
						$scope.mensagem = {
							texto: data
						};
						$scope.loading = false;
						$scope.contatos = data;

					})
			.error(function(data) {
				$scope.mensagem = {
					"texto: ": data.mensagem
				};
			});

		};



		/* INICIO */





/*		$scope.open = function (_id) {
			console.log('Valor: ' + _id );
			var modalInstance = $modal.open({
				controller: "ContatoController",
				templateUrl: 'partials/detalhe-modal.html',
				resolve: {
					id: function()
					{
						$http.get("http://localhost:3000/contatos/"+_id).success(function(data){
							$scope.teste = data;	
						});
						return $scope.teste;
					}
				}
			});*/

	// Modal		
	//$scope.name = ['Natanael de Sousa','Felipe'];
	$scope.open = function(size, _id) {
		console.log('size: ' + size + ' id: ' + _id);
		var modalInstance = $modal.open({	
			templateUrl : 'partials/detalhe-modal.html',
			controller : function($scope, $modalInstance, item) {
				console.log('xx'+item);
				$scope.item = item;

				$scope.ok = function () {
					$modalInstance.close();
				};
				
				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			},
			size: size,
			resolve: {
				item: function(){
					return _id;
					console.log('xx'+item);
				}
			}
		});

		modalInstance.result.then(function(selectedItem){
			$scope.selected = selectedItem;
			console.log('xx'+selectedItem);
		}, function(){
			$log.info('Modal: ' + new Date());
		});

	};    

	/* FIM */


});