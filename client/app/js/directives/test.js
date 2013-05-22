'use strict';

angular.module('citySensing')
  .directive('test', function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

      }
    };
  });