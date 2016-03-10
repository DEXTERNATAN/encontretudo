angular.module('contatooh').controller('UsuariosController', 
	function(Usuario, $scope, $resource, $http){

		$scope.usuarios = [];
		$scope.mensagem = {texto: ''};
		
		// Função para cadastrar o usuario na base de dados
		$scope.cadastraUsuario = function(){
			
			console.log("Debug: Cheguei no login " + $scope.usuario.login);
			console.log("Debug: Cheguei no password " + $scope.usuario.password);
			console.log("Debug: Cheguei no email " + $scope.usuario.email);
			
			$http.post("/cadusuario", $scope.usuario).success(function (data) {
				console.log("Sucesso" + data);
			}).error(function (data) {
				console.log("Error" + $scope.usuario);
			})

			
		}

});