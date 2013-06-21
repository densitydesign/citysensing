'use strict';

angular.module('citySensing')
  .directive('timelineContext', [ 'dataService', function (dataService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var timeline = citysensing.timeline()
          .width(element.outerWidth())
          .height(100)
          .brushing(true)
          .on("brushed",function(d){
            scope.request.start = d[0].getTime();
            scope.request.end = d[1].getTime();
            scope.$apply();
          })


        function update(){
          dataService.getTimelineContext(scope.request).then(
            function(data){
              // test now
              console.log(data)

              svg
                .datum(data.steps)
                .call(timeline)
            }, 
            function(error){
              scope.error = error;
            }
          );
        }

      	scope.$watch('request.cells', function(){
          update();
      	},true)

      }
    };
  }]);

angular.module('citySensing')
  .directive('timelineFocus', [ 'dataService', function (dataService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var timeline = citysensing.timeline()
          .width(element.outerWidth())
          .height(100)

        function update(){
          dataService.getTimelineFocus(scope.request).then(
            function(data){
              // test now
              console.log(data)

              svg
                .datum(data.steps)
                .call(timeline)
            }, 
            function(error){
              scope.error = error;
            }
          );
        }

        scope.$watch('request', function(){
          console.log("ehi è cambiato start", scope.request)
          //parti con la chiamata api
          update();
        },true)

      }
    };
  }]);