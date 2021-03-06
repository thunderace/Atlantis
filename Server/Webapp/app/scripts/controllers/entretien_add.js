'use strict';

/**
 * @ngdoc function
 * @name atlantisWebAppApp.controller:EntretienAddCtrl
 * @description # EntretienAddCtrl Controller of the atlantisWebAppApp
 */

nApp.controller('EntretienAddCtrl', function($scope, $http, $sessionStorage, $filter, $mdDialog, $mdToast, AtlantisUri) {
	$scope.submit = function(){
		if($scope.name == null || $scope.name == '' || $scope.date == null || $scope.date == ''){
			showToast($mdToast, 'Merci de remplir le nom et la date de péremption du produit !');
			return;
		}
		var nURL = AtlantisUri.Entretien() + '?api=' + $sessionStorage.api;
		nURL += '&nom=' + $scope.name + '&peremption=' + $filter('date')($scope.date, 'yyyy-MM-dd');
		if($scope.quantity != null && $scope.quantity > 1){
			nURL += '&qte=' + $scope.quantity;
		}
		$http.post(nURL).success(function(data, status){
			if(status == 202){
				$mdDialog.hide(data);
			}
		})
		
	}
	$scope.cancel = function(){
		$mdDialog.cancel();
	};
});
