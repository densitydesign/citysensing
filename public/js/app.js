'use strict';

// Declare app level module which depends on filters, and services

angular.module('citySensing', [
  'citySensing.controllers',
  'citySensing.filters',
  'citySensing.services',
  'citySensing.directives',
  'ui.bootstrap'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/about', {templateUrl: 'partials/about'})
    //.when('/',{redirectTo: '/', templateUrl: 'partials/main', controller: 'mainCtrl'})
    //.when('/',{redirectTo: '/', templateUrl: 'partials/main', controller: 'mfw'})
    .when('/',{redirectTo: '/about'})
    .when('/mfw',{templateUrl: 'partials/main', controller: 'mfw'})
    .when('/mdw',{templateUrl: 'partials/main', controller: 'mainCtrl'})
    .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
});
