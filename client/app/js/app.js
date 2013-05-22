'use strict';


// Declare app level module which depends on filters, and services
angular.module('citySensing', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {templateUrl: 'views/about.html', controller: 'main'});
    /*$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});*/
    $routeProvider.otherwise({redirectTo: '/', templateUrl: 'views/main.html', controller: 'main'});
  }]);
