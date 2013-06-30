'use strict';

/* Directives */

angular.module('citySensing.directives', [])

  .directive('sidePanel', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: '../templates/sidepanel.html',
      link: function postLink(scope, element, attrs) {

        function update(){
          apiService.getSidePanel(scope.request)
          .done(function(data){
            console.log(data);
            scope.hashtags = data.hashtags;
            scope.callsIn = data.calls_in;
            scope.callsOut = data.calls_out;
            scope.messagesIn = data.messages_in;
            scope.messagesOut = data.messages_out;
            scope.dataTraffic = data.data_traffic;
            scope.hashtags = data.hashtags.slice(0,20);
            scope.$apply();
          })
          .fail(function(error){
            scope.error = error;
          })
        }

      	scope.$watch('request', function(){
          update();
      	},true)

      }
    };
  }])

  .directive('eventList', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        request : '=',
        error: '=',
        events: '@'
      },
      templateUrl: '../templates/eventlist.html',
      link: function postLink(scope, element, attrs) {

        function update(){
          apiService.getEventList(scope.request)
          .done(function(data){

            scope.events = data.events;
            scope.$apply();
          })
          .fail(function(error){
            scope.error = error;
          })
        }

        scope.$watch('request', function(){
          update();
        },true)

      }
    };
  }])

  
	.directive('map', [ 'apiService', function (apiService) {
		return {
      restrict: 'A',
      replace: false,
      scope: {
        request: '=',
        grid: '=',
        color: '=',
        size: '=',
        showMap: '='
      },

      link: function postLink(scope, element, attrs) {

        var cells;
        var map = citysensing.map();

        function reload() {
          apiService.getMap(scope.request)
            .done(function(data){
              cells = data.cells;
              update();
            })
            .fail(function(error){
              scope.error = (error)
            })
        }
          
        function update() {
        	if (!scope.grid || !cells) return;

          map
            .grid(scope.grid)
            .color(function(d){ return d[scope.color.value]; })
            .size(function(d){ return d[scope.size.value]; })
            .showMap(scope.showMap)

          if (scope.color.value == 'social_activity')
            map.colorRange([
              d3.rgb(241, 238, 246),
              d3.rgb(189, 201, 225),
              d3.rgb(116, 169, 207),
              d3.rgb(43, 140, 190),
              d3.rgb(4, 90, 141)
            ])
          else map.colorRange(['red','green'])

          d3.select(element[0])
            .datum(cells)
            .call(map)
        }

        scope.$watch('request',function(){
          reload();
        }, true)

        scope.$watch('color',function(){
          update();
        }, true)

        scope.$watch('size',function(){
          update();
        }, true)

        scope.$watch('grid',function(){
          reload();
        },true)

        scope.$watch('showMap',function(){
          update();
        },true)

      }
    };
  }])

  .directive('network', [ 'apiService', function (apiService) {
		return {
      restrict: 'A',
      replace: false,
      templateUrl: '../templates/network.html',
      link: function postLink(scope, element, attrs) {

        var network = citysensing.graph();

        function update() {

        	apiService.getConceptNetwork(scope.request)
          .done(function(data){

            d3.select(element[0]).selectAll(".graph-container").remove();
              
            d3.select(element[0])
              .append("div")
                .attr("class","graph-container")
                .datum(data)
                .call(network)
            })
        }

        scope.start = function(){
          network.start();
        }

        scope.stop = function(){
          network.stop();
        }

        scope.$watch('request',function(){
          update();
        }, true)

      }
    };
  }])

  .directive('multilineFocus', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var multiline = citysensing.multiline()
          .activities(["social_activity","mobily_anomaly"])
          .width(element.outerWidth())
          .height(100)

        function update(){
          apiService.getTimelineFocus(scope.request)
          .done(function(data){
            svg
              .datum(data.steps)
              .call(multiline)
          })
          .fail(function(error){
            console.log(error)
          })
        }

        scope.$watch('request', function(){
          //parti con la chiamata api
          update();
        },true)

      }
    };
  }])

  .directive('multilineContext', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

      	var interval;

      	function updateTime(d){
      		scope.request.start = d[0].getTime();
          scope.request.end = d[1].getTime();
          scope.$apply();
      	}

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var multiline = citysensing.multiline()
          .activities(["social_activity","mobily_anomaly"])
          .brushing(true)
          .width(element.outerWidth())
          .height(100)
          .on("brushed",function(d){
            scope.request.start = d[0].getTime();
            scope.request.end = d[1].getTime();
            scope.$apply();
          	//window.clearInterval(interval)
            //interval = setTimeout(function(){ updateTime(d); }, 1000);
          })

        function update(){

          apiService.getTimelineContext(scope.request)
          .done(function(data){
            svg
              .datum(data.steps)
              .call(multiline)
          })
          .fail(function(error){
            console.log(error)
          })

        }

        scope.$watch('request.cells', function(){
          update();
        },true)

      }
    };
  }])

  .directive('selectpicker', [ function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {
          element.selectpicker();
      }
    };
}]);