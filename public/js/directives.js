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

        var cells = [];
        var map = citysensing.map();

        function reload() {         
          apiService.getMap(scope.request)
            .done(function(data){

              //dobbiamo vedere la differenza tra 
              var cellsObject = {};
              cells.forEach(function(d){ cellsObject[d.id] = d; })
              data.cells.forEach(function(d){ cellsObject[d.id] = d; })
              cells = d3.values(cellsObject);
              
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
            .on("selected",function(d){

              var index = scope.request.cells.indexOf(d);
              console.log(scope.request.cells)
              if (index == -1){
                scope.request.cells.push(d);
              }
              else{ 
                scope.request.cells.splice(index,1);
              }

              scope.$apply();
            })

          if (scope.color.value == 'social_activity')
            map.colorRange(['#ced9ee','#87bbdc', '#4b99c8', '#236fa6', '#074381'])
          else map.colorRange(['#D7191C','#FDAE61','#f6e154','#A6D96A','#1A9641'])

          d3.select(element[0])
            .datum(cells)
            .call(map)
        }

        scope.$watch('request.start', reload, true);
        scope.$watch('request.end', reload, true);

        scope.$watch('color',function(){
          scope.mapColor ="giorgio";
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
                .style("width","1000px")
                .style("height","800px")
            
            // trick for sigma start
            $(d3.select(element[0]).node()).parent().css("display","block")

            d3.select(element[0])
              .selectAll(".graph-container")
                .datum(data)
                .call(network)

            // trick for sigma end
            $(d3.select(element[0]).node()).parent().css("display","")

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

  .directive('flows', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var flows = citysensing.flows()
          .width(1000)
          .height(2000)

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", 1000)
          .attr("height", 2000)

        function update() {

          var fake = {};
          fake.start = scope.request.start;
          fake.end = scope.request.end;
          fake.cells = [3843, 6450];

          apiService.getConceptFlows(fake)
            .done(function(data){
              svg
              .datum(data)
              .call(flows)
            })

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

      	var steps = [],
            interval;

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
            
            var stepsObject = {};
            steps.forEach(function(d){ 
              var obj = d;
              obj.mobily_anomaly = 0;
              obj.social_activity = 0;

              stepsObject[d.start] = obj;

            });
            data.steps.forEach(function(d){ stepsObject[d.start] = d; })
            
            steps = d3.values(stepsObject);

            svg
              .datum(steps)
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
  }])

  .directive('mapLegend', [ function () {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: '../templates/maplegend.html',
      link: function postLink(scope, element, attrs) {

        scope.$watch('color', function(){
          if (!scope.color) return;
          if(scope.color.value == "social_activity")
            scope.mapLegend = ['#ced9ee','#87bbdc', '#4b99c8', '#236fa6', '#074381']
          else scope.mapLegend = ['#D7191C','#FDAE61','#f6e154','#A6D96A','#1A9641']
        })

      }
    };
  }])

 .directive('timeLegend', [ function () {
  return {
    restrict: 'A',
    replace: false,
    templateUrl: '../templates/timelegend.html',
    link: function postLink(scope, element, attrs) {

      scope.$watch('color', function(){
        if (!scope.color) return;
        if(scope.color.value == "social_activity")
          scope.mapLegend = ['#ced9ee','#87bbdc', '#4b99c8', '#236fa6', '#074381']
        else scope.mapLegend = ['#D7191C','#FDAE61','#f6e154','#A6D96A','#1A9641']
      })

    }
  };
}]);