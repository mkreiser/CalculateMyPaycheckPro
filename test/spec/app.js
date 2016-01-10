'use strict';

describe('Run', function() {
	beforeEach(module('calculateMyPaycheckProApp'));

	var $location, $rootScope;

	beforeEach(inject(function(_$location_, _$rootScope_) {
		$location = _$location_;
		$rootScope = _$rootScope_;

		spyOn($location, 'path');
	}));

	describe('$rootScope.goToState', function() {
		it('should call $location.path with the passed state', function() {
			$rootScope.goToState('some state');

			expect($location.path).toHaveBeenCalledWith('some state');
		});
	});
});
