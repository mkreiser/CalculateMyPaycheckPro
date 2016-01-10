'use strict';

describe('Controller: settingsCtrl', function() {
	beforeEach(module('calculateMyPaycheckProApp'));

	var controller, scope
	var $rootScope;

	beforeEach(inject(function($controller, _$rootScope_) {
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();

		spyOn(window.localStorage, 'setItem');

		controller = $controller('settingsCtrl', {
			$scope: scope
		});
	}));

	describe('scope.$watch $rootScope.withholdings', function() {
		it('should save the new value in localStorage', function() {
			$rootScope.withholdings.federal.value = 300;
			scope.$digest();

			$rootScope.withholdings.federal.value = 400;
			scope.$digest();

			expect(window.localStorage.setItem).toHaveBeenCalledWith($rootScope.withholdings.federal.route, 400);
		});
	});
});
