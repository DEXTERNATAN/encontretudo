angular.module('contatooh').factory('Usuario',
	function($resource) {
		return $resource('/cadastra_usuario/:id');
	});