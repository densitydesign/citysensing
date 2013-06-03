'use strict';

angular.module('citySensing')
  .directive('timeline', function () {
    return {
      restrict: 'E',
      replace: false,
      template:'<div></div>',
      link: function postLink(scope, element, attrs) {


      }
    };
  });