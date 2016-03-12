	angular.module('contatooh').controller('UsuariosController',
		function(Usuario, $scope, $resource, $http, $location) {

			$scope.usuarios = [];
			$scope.mensagem = {
				texto: ''
			};

			$scope.loginUsuario = function() {
				var objeto = {
					username: $scope.usuario.login,
					senha: $scope.usuario.password
				};
				console.log("Enviando: " + JSON.stringify(objeto));
				// Usar para debugar a aplicação.
				//debugger;
				$http.post('/logar', objeto).success(function(data, status) {

						var token = btoa("{\"username\" : \"" + $scope.usuario.login +
							"\", \"senha\" : \"" + $scope.usuario.password + "\"}");

						$http.defaults.headers.common.Authorization = 'BASIC ' + token;
						sessionStorage.token = token;
						console.log("Veio do servidor: " + data);
						if (!data.length)
							$scope.mensagem = {
								texto: "Usuario e senha incorretos."
							};

						if (data.length)
							$location.path("/contatos");
						//console.log("Login OK" + token);
						//window.location.href = "/contatos";

					})
					.error(function(data, status) {
						console.log("Errorooooo" + data.mensagem);
					});
			};

			// Função para cadastrar o usuario na base de dados
			$scope.cadastraUsuario = function() {

				console.log("Debug: Cheguei no login " + $scope.usuario.login);
				console.log("Debug: Cheguei no password " + $scope.usuario.password);
				console.log("Debug: Cheguei no email " + $scope.usuario.email);

				$http.post("/cadusuario", $scope.usuario).success(function(data) {
					console.log("Sucesso" + data);

					$scope.mensagem = {
						texto: "Usuario cadastrado com sucesso !!!"
					};

				}).error(function(data) {
					console.log("Error" + $scope.usuario);
				})


			}

		});
