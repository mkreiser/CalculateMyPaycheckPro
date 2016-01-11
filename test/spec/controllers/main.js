'use strict';

describe('Controller: mainCtrl', function() {
	beforeEach(module('calculateMyPaycheckProApp'));

	var controller, scope;
	var $rootScope;

	beforeEach(inject(function($controller, _$rootScope_) {
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();

		$rootScope.withholdings.federal.value = 10;
		$rootScope.withholdings.state.value = 10;
		$rootScope.withholdings.local.value = 5;
		$rootScope.withholdings.socialSecurity.value = 0;
		$rootScope.withholdings.medicare.value = 0;
		$rootScope.withholdings.retirement.value = 10;
		$rootScope.withholdings.other.value = 10;

		controller = $controller('mainCtrl', {
			$scope: scope
		});
	}));

	it('should set raw to 0', function() {
		expect(scope.raw).toEqual(0);
	});

	describe('scope.$watch rate, hours', function() {
		it('should set everything to 0 if raw isNaN', function() {
			scope.rate = 10;
			scope.hours = null;
			scope.$digest();

			expect(scope.raw).toEqual(0);
			expect(scope.taxes).toEqual(-0);
			expect(scope.retirement).toEqual(-0);
			expect(scope.other).toEqual(-0);
			expect(scope.net).toEqual(0);
		});

		it('should use $rootScope.withholdings to calculate the rate if raw is a number', function() {
			scope.rate = 10;
			scope.hours = 10;
			scope.$digest();

			expect(scope.raw).toEqual(100);
			expect(scope.taxes).toEqual(-25);
			expect(scope.retirement).toEqual(-10);
			expect(scope.other).toEqual(-10);
			expect(scope.net).toEqual(55);
		});
	});
});
