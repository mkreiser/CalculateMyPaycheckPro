'use strict';

angular.module('calculateMyPaycheckProApp')

.controller('settingsCtrl', function($rootScope, $scope) {
	$scope.$watch(function() {
		return $rootScope.withholdings;
	}, function(newValues, oldValues) {
		angular.forEach(newValues, function(item, key) {
			if (item.value !== oldValues[key].value) {
				window.localStorage.setItem(item.route, item.value);
			}
		});
	}, true);
});
