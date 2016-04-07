angular.module('contatooh')
.factory('myHttpResponseInterceptor',
	function($q, $rootScope) {

		return {
			request: function(config) {
				//config.url = config.url.replace();
				$rootScope.showLoading();
				console.log('request');
				return config;
			},
			response: function(response) {
				$rootScope.hideLoading();
				console.log('response');
				return response;
			},
			responseError: function(rejection) {
				$rootScope.hideLoading();
				return $q.reject(rejection);
			},

			requestError: function(rejection) {
				$rootScope.hideLoading();
				console.log('Failed', rejection.status, 'status');
				return $q.reject(rejection);
			}


		};

	});