'use strict';

// Declare app level module which depends on filters, and services

angular.module('citySensing', [
  'citySensing.controllers',
  'citySensing.filters',
  'citySensing.services',
  'citySensing.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/about', {templateUrl: 'partials/about'})
    .when('/',{redirectTo: '/', templateUrl: 'partials/main', controller: 'mainCtrl'})
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
});
