'use strict';

angular.module('citySensing')
  .directive('timeline', function () {
    return {
      restrict: 'E',
      replace: false,
      template:'<div><span id="result">{{start}}</span></div>',
      link: function postLink(scope, element, attrs) {


      	scope.$watch('start', function(){
      		console.log("ehi è cambiato start", scope.start)
      		//parti con la chiamata api
      	})

      }
    };
  });