'use strict';

angular.module('citySensing')
  .directive('sidePanel', [ 'dataService', function (dataService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        function update(){
          dataService.getSidePanel(scope.request).then(
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
          console.log("daiiii")
          update();
      	},true)

      }
    };
  }]);