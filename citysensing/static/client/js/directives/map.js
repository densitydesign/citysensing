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

        function update() {
          if (!scope.cells || !scope.grid) return;

          var map = citysensing.map()
            .grid(scope.grid)

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
          update();
        })

      }
    };
  });


