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
              scope.hashtags = data.hashtags.slice(0,100);
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
      templateUrl: '../templates/eventlist.html',
      link: function postLink(scope, element, attrs) {

        var events = [],
          eventsPerPage = 20;

        scope.maxSize = 5;
        scope.bigNoOfPages = 18;
        scope.bigCurrentPage = 1;

        function update(){
          apiService.getEventList(scope.request)
          .done(function(data){
            
            events = data.events;

            scope.bigNoOfPages = events.length % eventsPerPage > 0 ? Math.floor(events.length/ eventsPerPage) + 1 : Math.floor(events.length/ eventsPerPage);
            scope.bigCurrentPage = 1;            
            scope.events = events.slice( (scope.bigCurrentPage-1) * eventsPerPage, scope.bigCurrentPage * eventsPerPage);
            scope.$apply();

            
          })
          .fail(function(error){
            scope.error = error;
          })
        }

        scope.selectPage = function(page){
          scope.events = events.slice( (page-1) * eventsPerPage, page * eventsPerPage);
        }

        scope.select = function(event){
          scope.request.cells = [event.squareID];
          scope.request.start = event.date[0];
          scope.request.end = event.date[1] + 86400000; // adding milliseconds to reach the end of the day
        }

        scope.$watch('request', function(){
          update();
        },true)

      }
    };
  }])

  .directive('areaList', [ function () {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: '../templates/arealist.html',
      link: function postLink(scope, element, attrs) {

        scope.selectArea = function(area) {
          scope.request.cells = area.cells;
        }

      }
    };
  }])

  
	.directive('map', [ 'apiService', '$rootScope', function (apiService, $rootScope) {
		return {
      restrict: 'A',
      replace: false,

      link: function postLink(scope, element, attrs) {

        var cells = [],
            map = citysensing.map()
            .on("selected", function (d) {
              var index = scope.request.cells.indexOf(d);
              if (index == -1) scope.request.cells.push(d);
              else scope.request.cells.splice(index,1);
              scope.$apply();
            })
            //.selected(function(d){ return scope.request.cells.length != 0; })
            .popover(popover);

        function reload() {         
          var fakeRequest = {};
          fakeRequest.cells = [];
          fakeRequest.start = scope.request.start;
          fakeRequest.end = scope.request.end;
          //console.log(scope.request, fakeRequest)
          apiService.getMap(fakeRequest)
            .done(function(data){
              
              var cellsObject = {};
              cells.forEach(function(d){ d.selected = false; cellsObject[d.id] = d; })
              data.cells.forEach(function(d){
                if ( cellsObject[d.id] && scope.request.cells.indexOf(d.id) != -1 )  d.selected = true;
                cellsObject[d.id] = d;
              })
              cells = d3.values(cellsObject);
              
              update();
            })
            .fail(function(error){
              scope.error = (error)
            })
        }
          
        function update() {


        	if (!scope.grid || !cells) return;
          
          // update colorScale            
          if (scope.color.value == 'social_activity')
            map.colorScale(d3.scale.quantile().range(['#ced9ee','#87bbdc', '#4b99c8', '#236fa6', '#074381']).domain([ d3.min(cells, map.color()), d3.mean(cells, map.color()), d3.max(cells, map.color()) ]))
          else 
            map.colorScale(d3.scale.quantile().range(['#D7191C','#FDAE61','#f6e154','#A6D96A','#1A9641']).domain([ d3.min(cells, map.color()), d3.mean(cells, map.color()), d3.max(cells, map.color()) ]))

          // update sizeScale            
          if (scope.size.value == 'mobily_anomaly')
            map.sizeScale(function(d) { return d < 0 ? .1 : Math.pow(d, scope.anomalyExponent) })
          else
            map.sizeScale(d3.scale.linear().range([0.1, 1]).domain([ d3.min(cells, map.size()), d3.max(cells, map.size()) ]));


          d3.select(element[0])
            .datum(cells)
            .call(map)

        }

        /* Popover accessor */

        function popover(d,i) {

          var div;
          div = d3.select(document.createElement("div"))
            .style("height", "100px")
            .style("width", "100%")

          var list = div.append("dl")
            .attr("class","dl-horizontal")
          
          list.append("span").attr("class","key pull-left").html("Social activity")
          list.append("span").attr("class","value pull-right").html(d.properties.social_activity)
          list.append("div").attr("class","clearfix")
          list.append("span").attr("class","key pull-left").html("Social sentiment")
          list.append("span").attr("class","value pull-right").html(d.properties.social_sentiment)
          list.append("div").attr("class","clearfix")
          list.append("span").attr("class","key pull-left").html("Mobile activity")
          list.append("span").attr("class","value pull-right").html(d.properties.mobily_activity)
          list.append("div").attr("class","clearfix")
          list.append("span").attr("class","key pull-left").html("Mobile anomaly")
          list.append("span").attr("class","value pull-right").html(d.properties.mobily_anomaly)
          list.append("div").attr("class","clearfix")

          div.append("span")
            .attr("class","muted")
            .html(function(){ return d.properties.selected ? "This cell is selected." : "Click to select this cell."})

          return {
            title: "Cell " + d.properties.id,
            content: div,
            detection: "shape",
            placement: "mouse",
            gravity: "left",
            displacement: [-290, -85 ],
            mousemove: true
          };

        }

        scope.$watch('request', reload, true);
        scope.$watch('anomalyExponent', update, true);

        //scope.$watch('request.end', reload, true);
        scope.$watch('events', function(){
          //map.popover(popover);
        }, true);

        scope.$watch('color',function(){
          map.color(function(d){ return d[scope.color.value]; });
          update();
        }, true)

        scope.$watch('size',function(){
          map.size(function(d){ return d[scope.size.value]; });
          update();
        }, true)

        scope.$watch('grid',function(){
          if (!scope.grid) return;
          map.grid(scope.grid);
          update();
        },true)

        scope.$watch('showMap',function(){
          map.showMap(scope.showMap)
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

  .directive('flowsOne', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var flows = citysensing.flows()
          .width(500)
          .height(1000)

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", 500)
          .attr("height", 1000)

        function update() {

          apiService.getConceptFlows(scope.request)
            .done(function(data){
              
              data.nodes = data.nodes.filter(function(d){
                return d.group != "foursquare";
              });

              data.nodes.forEach(function(d,i){
                d.name = d.id;
                d.id = i;
              })

              var nodesObject = data.nodes.map(function(d){ return d.name; });

              data.links.forEach(function(d){
                if (nodesObject.indexOf(d.target) != -1 ) {
                  data.nodes[nodesObject.indexOf(d.target)].check = true;
                  data.nodes[nodesObject.indexOf(d.source)].check = true;
                }
              })

              data.nodes = data.nodes.filter(function(d){
                return d.check == true;
              })

              nodesObject = data.nodes.map(function(d){ return d.name; });

              data.links.forEach(function(d){
                d.source = nodesObject.indexOf(d.source);
                d.target = nodesObject.indexOf(d.target);
              })

              data.links = data.links.filter(function(d){ 
                return d.source != -1 && d.target != -1;
              })

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

  .directive('flowsTwo', [ 'apiService', function (apiService) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var flows = citysensing.flows()
          .width(500)
          .height(1000)
          .filter(function(d){
            return d.group != "hashtag";
          })

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", 500)
          .attr("height", 1000)

        function update() {

          apiService.getConceptFlowsTwo(scope.request)
            .done(function(data){
              

              data.nodes = data.nodes.filter(function(d){
                return d.group != "hashtag";
              });

              data.nodes.forEach(function(d,i){
                d.name = d.id;
                d.id = i;
              })

              var nodesObject = data.nodes.map(function(d){ return d.name; });

              data.links.forEach(function(d){
                //if (nodesObject.indexOf(d.source) != -1 ) data.nodes[nodesObject.indexOf(d.source)].check = true;
                if (nodesObject.indexOf(d.source) != -1 ) {
                  data.nodes[nodesObject.indexOf(d.target)].check = true;
                  data.nodes[nodesObject.indexOf(d.source)].check = true;
                }
              })

              data.nodes = data.nodes.filter(function(d){
                return d.check == true;
              })

              nodesObject = data.nodes.map(function(d){ return d.name; });

              data.links.forEach(function(d){
                d.source = nodesObject.indexOf(d.source);
                d.target = nodesObject.indexOf(d.target);
              })

              data.links = data.links.filter(function(d){ 
                return d.source != -1 && d.target != -1;
              })

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
        
        var steps = [],
            allData;

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var multiline = citysensing.multiline()
          .colors(scope.colors)
          .activities([ scope.color.value, scope.size.value ])
          .linesAccessor(lines)
          .width(element.outerWidth())
          .height(100)
          .on("highlight", function(d){ scope.$broadcast("highlight", d); })

        function reload(){
          var fake = {};
          fake.start = scope.star;
          fake.end = scope.end;
          fake.cells = scope.request.cells;
          
          apiService.getTimelineFocus(fake)
            .done(function(data){
              
              allData = data.steps; 

              apiService.getTimelineFocus(scope.request)
                .done(function(data){
                  steps = data.steps;
                  update();
                })
              
            })
            
        }

        function update(){
          if (!steps || !steps.length) return;
          multiline
            .activities([ scope.color.value, scope.size.value ])

          svg
            .datum(steps)
            .call(multiline)
        
        }

        function anomalyValue(d) {
          return d < 0 ? 0 : Math.pow(d, scope.anomalyExponent);
        }

        function lines(name) {

          if (name == 'mobily_anomaly') {

            var scale = d3.scale.linear().range([0,1]).domain([ -1, 1])
            multiline.scales(name,scale)

            return {
              name: name,
              values: steps.map(function(d) {
                return { date: new Date(d.start), value: +scale(anomalyValue(d[name])) };
              })
            };
          }

          var min = d3.min(allData, function(d){ return d[name]; }),
              max = d3.max(allData, function(d){ return d[name]; }),
              scale = d3.scale.linear().range([0,1]).domain([min, max])
              multiline.scales(name,scale)

          return {
            name: name,
            values: steps.map(function(d) {
              return { date: new Date(d.start), value: +scale(d[name]) };
            })
          };
        
        }

        scope.$watch('anomalyExponent', update, true);

        scope.$watch('request', function(){
          //parti con la chiamata api
          reload();
        },true)

        scope.$watch('color', function(color){
          if (!color) return;
          update();
        },true)

        scope.$watch('size', function(size){
          if (!size) return;
          update();
        },true)

        scope.$watch('timeScales', function(){
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
            scales = {},
            interval;

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)

        var multiline = citysensing.multiline()
          .activities([ scope.color.value, scope.size.value ])
          .linesAccessor(lines)
          .brushing(true)
          .colors(scope.colors)
          .width(element.outerWidth())
          .height(100)
          .on("brushed", brushed)
          .on("highlight", function(d){ scope.$broadcast("highlight", d); })

        function reload() {

          apiService.getTimelineContext(scope.request)
          .done(function(data){
            
            var stepsObject = {};
            
            steps.forEach(function(d){ 
              var obj = d;
              obj.mobily_anomaly = 0;
              obj.social_activity = 0;
              obj.mobily_activity = 0;
              obj.social_sentiment = 0;
              stepsObject[d.start] = obj;
            });

            data.steps.forEach(function(d){ stepsObject[d.start] = d; })
            
            steps = d3.values(stepsObject);

            steps.forEach(function(d){ d.old_mobily_anomaly = d.mobily_anomaly });

            update();
          })

        }

        function update() {
          if (!steps || !steps.length) return;

          multiline
            .activities([ scope.color.value, scope.size.value ])

          svg
            .datum(steps)
            .call(multiline)
        }

        function anomalyValue(d) {
          return d < 0 ? 0 : Math.pow(d, scope.anomalyExponent);
        }

        function lines(name) {

          if (name == 'mobily_anomaly') {

            var scale = d3.scale.linear().range([0,1]).domain([ -1, 1]);
            multiline.scales(name,scale)

            return {
              name: name,
              values: steps.map(function(d) {
                return { date: new Date(d.start), value: +scale(anomalyValue(d[name])) };
              })
            };
          }

          var min = d3.min(steps, function(d){ return d[name]; }),
              max = d3.max(steps, function(d){ return d[name]; }),
              scale = d3.scale.linear().range([0,1]).domain([min, max]);
              multiline.scales(name,scale)

          return {
            name: name,
            values: steps.map(function(d) {
              return { date: new Date(d.start), value: +scale(d[name]) };
            })
          };
        
        }

        function brushed(d){
          scope.brushStart = d[0].getTime();
          scope.brushEnd = d[1].getTime();
          //scope.$apply();
        }

        scope.$watch('request.anomalyColumnName', reload, true);
        scope.$watch('anomalyExponent', update, true);
          
        scope.$watch('request.cells', function(){
          reload();
        },true)

        scope.$watch('request.start', function(n,o){
          if (n === o) return;
          multiline.startBrush(new Date(scope.request.start));
          reload();
        },true)

        scope.$watch('request.end', function(n, o){
          if (n === o) return;
          multiline.endBrush(new Date(scope.request.end));
          reload();
        },true)

        scope.$watch('color', function(color){
          if (!color) return;
          update();
        },true)

        scope.$watch('size', function(size){
          if (!size) return;
          update();
        },true)

      }
    };
  }])

  .directive('mapInfo', [ function () {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: '../templates/mapinfo.html',
      link: function postLink(scope, element, attrs) {

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
    scope : {
      color : "=",
      size : "=",
      timeHighlight : "="
    },
    replace: false,
    templateUrl: '../templates/timelegend.html',
    link: function postLink(scope, element, attrs) {

      scope.$watch('color', function(){
        if (!scope.color) return;
        if(scope.color.value == "social_activity")
          scope.mapLegend = ['#ced9ee','#87bbdc', '#4b99c8', '#236fa6', '#074381']
        else scope.mapLegend = ['#D7191C','#FDAE61','#f6e154','#A6D96A','#1A9641']
      })

      scope.$on("highlight", function(e,d){
        
        element.find(".highlight").html("")
        if (!d) return;
        for (var a in d) {
          element.find("#"+a).html(d[a]);
        }
        //scope.$apply();
      })

    }
  };
  }])

 .directive('spinner', [ '$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      replace: true,
      template : '<div id="spinner-container"><div id="spinner"></div></div>',
      link: function postLink(scope, element, attrs) {

        var opts = {
          width: 4, // The line thickness
        };
        scope.loading = 0;
        var spinner = new Spinner(opts).spin();
        element.find("#spinner").append(spinner.el);

        $rootScope.$on("loading", function(event, data){
          if(data === true) scope.loading++; else scope.loading--;
          if(scope.loading > 0) {
            element.css("display", "block");
            spinner.spin();
          }
          else {
            element.css("display", "none");
            spinner.stop();
          }
        })
      }
    };
  }]);