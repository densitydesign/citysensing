(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.multiline = function(){

    var width = 900,
      height = 100,
      activities = [],
      brushing = false,
      dispatch = d3.dispatch("brushed")

    function vis(selection){
      selection.each(function(data){

        var margin = {top: 20, right: 20, bottom: 30, left: 0},
          w = width - margin.right - margin.left,
          h = height - margin.top - margin.bottom

        var x = d3.time.scale()
            .range([0, w]);

        var y = d3.scale.linear()
            .range([h, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        data.forEach(function(d) {
          d.date = new Date(d.start);
        });

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        color.domain(d3.keys(data[0]).filter(function(key) { return activities.indexOf(key) != -1; }));

        var lines = color.domain().map(function(name) {

          // normalizing...
          var scale = d3.scale.linear().range([0,1]).domain([
            d3.min(data, function(d){ return d[name]; }),
            d3.max(data, function(d){ return d[name]; })
            ])

          return {
            name: name,
            values: data.map(function(d) {
              return { date: new Date(d.start), value: +scale(d[name]) };
            })
          };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([
          d3.min(lines, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
          d3.max(lines, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
        ]);

        selection.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);

        var lineo = selection.selectAll(".activity")
            .data(lines)
          .enter().append("g")
            .attr("class", "activity");

        lineo.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); });

        if (brushing) {

          var brush = d3.svg.brush()
            .x(x)
            .on("brush", function(d){
              if (brush.empty())  dispatch.brushed([d3.min(data, function(d){ return new Date(d.start); }), d3.max(data, function(d){ return new Date(d.end); })])
              else dispatch.brushed(brush.extent()); 
            });

          var brushNode = selection.selectAll("g.brush")
            .data([data])
            .attr("class", "x brush")
            .call(brush)
          
          brushNode.enter().append("g")
          .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", h + 7);

          brushNode.exit().remove();

        }

        /*
        var x = d3.time.scale().range([margin.left, w]).domain([
            d3.min(data, function(d){ return d.start; }),
            d3.max(data, function(d){ return d.end; })
          ]),
          y = d3.scale.linear().domain([0,d3.max(data,function(d){ return d.social_activity; })]).rangeRound([0,h])
          xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(6, 0, 0)//.tickFormat(d3.time.format("%a %e %B"))

        var bar = selection.selectAll(".bar")
            .data(data)
            .attr("x", function(d) { return x(d.start); })
            .attr("width", function(d){ return x(d.end) - x(d.start); })
            .attr("y", h)
            .attr("height", 0)
        
        bar.transition()
              .attr("y", function(d){ return h - y(d.social_activity); })
              .attr("height", function(d) { return y(d.social_activity); });

        bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.start); })
            .attr("width", function(d){ return x(d.end) - x(d.start); })
            .attr("y", h)
            .attr("height", 0)
            .transition()
              .attr("y", function(d){ return h - y(d.social_activity); })
              .attr("height", function(d) { return y(d.social_activity); });

        bar.exit().remove();

        selection.selectAll("g.axis").remove();

        selection.append("g")
          .data([data])
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);
        
        if (brushing) {

          var brush = d3.svg.brush()
            .x(x)
            .on("brush", function(d){
              if (brush.empty())  dispatch.brushed([d3.min(data, function(d){ return new Date(d.start); }), d3.max(data, function(d){ return new Date(d.end); })])
              else dispatch.brushed(brush.extent()); 
            });

          var brushNode = selection.selectAll("g.brush")
            .data([data])
            .attr("class", "x brush")
            .call(brush)
          
          brushNode.enter().append("g")
          .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", h + 7);

          brushNode.exit().remove();

        }
        */

      })
    }


    vis.width = function(_width){
      if (!arguments.length) return width;
      width = _width;
      return vis;
    }

    vis.height = function(_height){
      if (!arguments.length) return height;
      height = _height;
      return vis;
    }

    vis.activities = function(_activities){
      if (!arguments.length) return activities;
      activities = _activities;
      return vis;
    }

    vis.brushing = function(_brushing){
      if (!arguments.length) return brushing;
      brushing = _brushing;
      return vis;
    }

    d3.rebind(vis, dispatch, 'on');

    return vis;
  }

})();



/*
var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

*/

