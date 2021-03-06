'use strict';

/**
 * @ngdoc function
 * @name atlantisWebAppApp.controller:StatusSettingsCtrl
 * @description # StatusSettingsCtrl Controller of the atlantisWebAppApp
 */

nApp.controller('StatusSettingsCtrl', function($scope, $http, $sessionStorage, $mdToast, AtlantisUri) {
	get();
	getCallNotifier()
	$scope.startDaemon = function(){
		var nURL = AtlantisUri.System() + '?api=' + $sessionStorage.api + '&daemon=start';
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				showToast($mdToast, 'Démarrage en cours...');
				$scope.daemon = 'En cours...';
			}else{
				showToast($mdToast, 'Un problème technique est survenu (' + status + ')');
			}
		})
	};
	$scope.stopDaemon = function(){
		var nURL = AtlantisUri.System() + '?api=' + $sessionStorage.api + '&daemon=stop';
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				showToast($mdToast, 'Arrêt en cours...');
				$scope.daemon = 'A l\'arrêt.';
			}else{
				showToast($mdToast, 'Un problème technique est survenu (' + status + ')');
			}
		})
	};
	$scope.toggleNightMode = function(mode){
		var nURL = AtlantisUri.System() + '?api=' + $sessionStorage.api + '&nightAuto=' + mode;
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				if(mode){
					showToast($mdToast, 'Fonction activée !');
				}else{
					showToast($mdToast, 'Fonction désactivée !');
				}
			}
		});
	};
	$scope.saveNightModeTime = function(){
		var from = $scope.night.from;
		var to = $scope.night.to;
		var fromDate = new Date(from);
		var toDate = new Date(to);
		var nURL = AtlantisUri.System() + '?api=' + $sessionStorage.api;
		nURL += '&nightFrom=' + fromDate.getHours() + ':' + fromDate.getMinutes() + '&nightTo=' + toDate.getHours() + ':' + toDate.getMinutes();
		$http.put(nURL).success(function(data, status){
			if(status == 202){
				showToast($mdToast, 'Horaires modifiés avec succès !');
			}
		});
	};
	$scope.toggleCall = function(settings, status){
		var nURL = AtlantisUri.Settings() + '?api=' + $sessionStorage.api + '&section=CallNotifier&key=' + settings + '&value=' + status;
		$http.put(nURL).success(function(data, status){
			//TODO
		});
	};
	function get(){
		var nURL = AtlantisUri.System() + '?api=' + $sessionStorage.api;
		$http.get(nURL).success(function(data, status){
			if(status == 202){
				$scope.free_hdd = Math.round(data.free_hdd * 100);
				if(data.daemon == true){
					$scope.daemon = 'En cours...';
				}else{
					$scope.daemon = 'A l\'arrêt.';
				}
				var from = data.nightFrom.split(':');
				var to = data.nightTo.split(':');
				$scope.night = {from:new Date(1970, 0, 1, from[0], from[1]), to:new Date(1970, 0, 1, to[0], to[1]), status: data.nightAuto};
			}
		});
	}
	function getCallNotifier(){
		var nURL = AtlantisUri.Settings() + '?api=' + $sessionStorage.api + '&type=CallNotifier';
		$http.get(nURL).success(function(data, status){
			if(status == 202){
				$scope.call = data;
			}
		});
	}
});
