'use strict';

angular.module('citySensing')
  .directive('map', function () {
    return {
      restrict: 'E',
      replace: false,
      template:'<div id="viz"></div>',
      link: function postLink(scope, element, attrs) {

        var map = citysensing.map()

        d3.select(element[0])
          .call(map)

      }
    };
  });


