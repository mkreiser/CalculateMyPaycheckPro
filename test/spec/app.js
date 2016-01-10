'use strict';

describe('Run', function() {
	beforeEach(module('calculateMyPaycheckProApp'));

	var $location, $rootScope;

	beforeEach(inject(function(_$location_, _$rootScope_) {
		$location = _$location_;
		$rootScope = _$rootScope_;

		window.localStorage.setItem('calculate-my-paycheck-pro-federal', 10);

		spyOn($location, 'path');
	}));

	describe('$rootScope.goToState', function() {
		it('should call $location.path with the passed state', function() {
			$rootScope.goToState('some state');

			expect($location.path).toHaveBeenCalledWith('some state');
		});
	});

	describe('$rootScope.checkLocation', function() {
		it('should return true if the current path is /settings', function() {
			$location.path.and.returnValue('/settings');

			expect($rootScope.checkLocation()).toBeTruthy();
		});

		it('should return false if the current path is not /settings', function() {
			$location.path.and.returnValue('/anything');

			expect($rootScope.checkLocation()).toBeFalsy();
		});
	});

	describe('$rootScope.withholdings', function() {
		it('should get values from localStorage, settings null values to 0', function() {
			expect($rootScope.withholdings.federal.value).toEqual(10);
			expect($rootScope.withholdings.state.value).toEqual(0);
		});
	});
});
