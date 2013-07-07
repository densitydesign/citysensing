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

        var margin = {top: 10, right: 20, bottom: 30, left: 0},
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

        var _line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        var line = d3.svg.area()
            .interpolate("monotone")
            .x(function(d) { return x(d.date); })
            .y0(h)
            .y1(function(d) { return y(d.value); });

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

        

        var activity = selection.selectAll(".activity")
          .data(lines)

        activity.enter().append("g")
          .attr("class", "activity");

        var path = activity.selectAll("path")
          .data(function(d){ return [d];})
          .style("stroke", function(d) { return color(d.name); });

        path.transition()
          .attr("d", function(d) { return line(d.values); })

        path.enter().append("path")
            .attr("class", "line")
            .style("stroke", function(d) { return color(d.name); })
            .style("fill", function(d){ return color(d.name); })
            .transition()
              .attr("d", function(d) { return line(d.values); })

        selection.selectAll("g.axis").remove();
        selection.append("g")
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
            .call(brush)
          
          brushNode.enter().append("g")
          .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", h + 7)
            .selectAll(".resize").append("path")
              .attr("transform", "translate(0," +  height / 2 + ")")
              .attr("d", resizePath);


          brushNode.exit().remove();

        }

        function resizePath(d) {
          var e = +(d == "e"),
              x = e ? 1 : -1,
              y = h / 3;

          return "M" + (.5 * x) + "," + y
              + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
              + "V" + (2 * y - 6)
              + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
              + "Z"
              + "M" + (2.5 * x) + "," + (y + 8)
              + "V" + (2 * y - 8)
              + "M" + (4.5 * x) + "," + (y + 8)
              + "V" + (2 * y - 8);
        }

        

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
