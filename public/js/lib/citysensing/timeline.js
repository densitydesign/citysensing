(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.timeline = function(){

    var width = 900,
      height = 100,
      brushing = false,
      dispatch = d3.dispatch("brushed")

    function vis(selection){
      selection.each(function(data){

        var margin = {top: 20, right: 20, bottom: 30, left: 0},
          w = width - margin.right - margin.left,
          h = height - margin.top - margin.bottom

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

    vis.brushing = function(_brushing){
      if (!arguments.length) return brushing;
      brushing = _brushing;
      return vis;
    }

    d3.rebind(vis, dispatch, 'on');

    return vis;
  }

})();
