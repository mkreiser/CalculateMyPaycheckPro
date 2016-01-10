'use strict';

/**
 * @ngdoc overview
 * @name calculateMyPaycheckProApp
 * @description
 * # calculateMyPaycheckProApp
 *
 * Main module of the application.
 */
angular
.module('calculateMyPaycheckProApp', [
  'ngAnimate',
  'ngCookies',
  'ngMaterial',
  'ngResource',
  'ngRoute',
  'ngSanitize'
])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainCtrl'
		})
		.when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'settingsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
})
.run(function($location, $rootScope) {
	$rootScope.goToState = function(state) {
		$location.path(state);
	};

	$rootScope.checkLocation = function() {
		return $location.path() === '/settings';
	};

	$rootScope.withholdings = {
		federal: {
			name: 'Federal Tax',
			route: 'calculate-my-paycheck-pro-federal'
		},
		state: {
			name: 'State Tax',
			route: 'calculate-my-paycheck-pro-state'
		},
		local: {
			name: 'Local Tax',
			route: 'calculate-my-paycheck-pro-local'
		},
		socialSecurity: {
			name: 'Social Security Tax',
			route: 'calculate-my-paycheck-pro-social-security'
		},
		medicare: {
			name: 'Medicare Tax',
			route: 'calculate-my-paycheck-pro-medicare'
		},
		retirement: {
			name: 'Retirement Withholding',
			route: 'calculate-my-paycheck-pro-retirement'
		},
		other: {
			name: 'Other Withholding',
			route: 'calculate-my-paycheck-pro-other'
		}
	};

	angular.forEach($rootScope.withholdings, function(item) {
		var value = parseInt(window.localStorage.getItem(item.route));

		if (isNaN(value)) {
			item.value = 0;
		} else {
			item.value = value;
		}
	});
});
