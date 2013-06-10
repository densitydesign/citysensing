'use strict';

angular.module('citySensing')
  .directive('map', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        cells : '=',
        grid : '='
      },
      link: function postLink(scope, element, attrs) {

        var map = citysensing.map();

        function update() {

          if (!scope.cells || !scope.grid) return;

          d3.select(element[0]).selectAll("svg").remove();
          d3.select(element[0])
            .append("svg")
            .datum(scope.cells)
            .call(map);
        }

        scope.$watch('cells',function(){
          update();
        })

        scope.$watch('grid',function(){
          map.grid(scope.grid)
          update();
        })

      }
    };
  });


