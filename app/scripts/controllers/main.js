'use strict';

angular.module('calculateMyPaycheckProApp')

.controller('mainCtrl', function($rootScope, $scope) {
	 $scope.raw = 0;

  var calculateResult = function() {
    $scope.raw = $scope.rate * $scope.hours;

    if(isNaN($scope.raw)) {
      $scope.raw = 0;
      $scope.taxes = 0;
      $scope.retirement = 0;
      $scope.other = 0;
      $scope.net = 0;
    } else {
    	var w = $rootScope.withholdings;

    	$scope.taxes = -1 * ($scope.raw * w.federal.value / 100 + $scope.raw * w.state.value / 100 + $scope.raw * w.local.value / 100 + $scope.raw * w.socialSecurity.value / 100 + $scope.raw * w.medicare.value / 100);
    	$scope.retirement = -1 * $scope.raw * w.retirement.value / 100;
    	$scope.other = -1 * $scope.raw * w.other.value / 100;

    	$scope.net = $scope.raw + $scope.taxes + $scope.retirement + $scope.other;
    }
  };

  $scope.$watch('rate', function() {
    calculateResult();
  });
  $scope.$watch('hours', function() {
    calculateResult();
  });
});
