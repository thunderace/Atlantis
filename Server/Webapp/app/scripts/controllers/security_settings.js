'use strict';

/**
 * @ngdoc function
 * @name atlantisWebAppApp.controller:SecuritySettingsCtrl
 * @description # SecuritySettingsCtrl Controller of the atlantisWebAppApp
 */

nApp.controller('SecuritySettingsCtrl', function($scope, $http, $sessionStorage, $filter, $mdToast, AtlantisUri) {
	get();
	$scope.saveTemperature = function(){
		var temperature = $scope.security.temperature;
		var high = $scope.security.temperatureHigh;
		var low = $scope.security.temperatureLow;
		var nURL = AtlantisUri.Settings() + '?api=' + $sessionStorage.api + '&section=Security';
		nURL += '&temperature=' + temperature + '&temperatureHigh=' + high + '&temperatureLow=' + low;
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				showToast($mdToast, 'Paramètres modifiés avec succès !');
			}else{
				showToast($mdToast, 'Impossible de modifier les paramètres de sécurité (erreur ' + status + ') !');
			}
		});
	};
	$scope.savePhotos = function(){
		var photos = $scope.security.photos;
		var nb = $scope.security.photosNumber;
		var sec = $scope.security.photosSeconds;
		var nURL = AtlantisUri.Settings() + '?api=' + $sessionStorage.api + '&section=Security';
		nURL += '&photos=' + photos + '&photosNumber=' + nb + '&photosSeconds=' + sec;
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				showToast($mdToast, 'Paramètres modifiés avec succès !');
			}else{
				showToast($mdToast, 'Impossible de modifier les paramètres de sécurité (erreur ' + status + ') !');
			}
		});
	};
	function get(){
		var nURL = AtlantisUri.Settings() + '?api=' + $sessionStorage.api + '&type=Security';
		$http.get(nURL).success(function(data, status){
			if(status == 202){
				$scope.security = data;
			}else{
				showToast($mdToast, 'Impossible de récupérer les paramètres de sécurité (erreur ' + status + ') !');
			}
		});
	}
});
