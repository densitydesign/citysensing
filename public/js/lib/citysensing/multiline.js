(function(){

  var citysensing = window.citysensing || (window.citysensing = {});


    var SVGMask = (function() {

      function SVGMask(focus) {
          this.focus = focus;
          this.mask  = this.focus.append("g").attr("class","mask");
          this.left  = this.mask.append("polygon");
          this.right = this.mask.append("polygon");
          this._x = null;
          this._y = null;
      }
      
      SVGMask.prototype.style = function(prop, val) {
          this.left.style(prop, val);
          this.right.style(prop, val);
          return this;
      }
      
      SVGMask.prototype.x = function(f) {
          if (f == null) {
              return this._x;
          }
          this._x = f;
          return this;
      };
      
      SVGMask.prototype.y = function(f) {
          if (f == null) {
              return this._y;
          }
          this._y = f;
          return this;
      };
      
      SVGMask.prototype.redraw = function() {
          var lp, maxX, maxY, minX, minY, rp, xDomain, yDomain;
          yDomain = this._y.domain();
          minY = yDomain[0];
          maxY = yDomain[1];
          xDomain = this._x.domain();
          minX = xDomain[0];
          maxX = xDomain[1];
          lp = {
              l: this._x(minX),
              t: this._y(minY),
              r: this._x(this.from),
              b: this._y(maxY)
          };
          rp = {
              l: this._x(this.to),
              t: this._y(minY),
              r: this._x(maxX),
              b: this._y(maxY)
          };
          this.left.attr("points", "" + lp.l + "," + lp.t + "  " + lp.r + "," + lp.t + "  " + lp.r + "," + lp.b + "  " + lp.l + "," + lp.b);
          this.right.attr("points", "" + rp.l + "," + rp.t + "  " + rp.r + "," + rp.t + "  " + rp.r + "," + rp.b + "  " + rp.l + "," + rp.b);
          return this;
      };
      
      SVGMask.prototype.reveal = function(extent) {
          this.from = extent[0];
          this.to = extent[1];
          this.redraw();
          return this;
      };
      
      return SVGMask;
      
    })();


  citysensing.multiline = function(){

    var width = 900,
      height = 100,
      activities = [],
      brushing = false,
      dispatch = d3.dispatch("brushed", "highlight"),
      startBrush,
      endBrush,
      colors,
      scales = {};

    function vis(selection){
      selection.each(function(data){

        var margin = {top: 10, right: 10, bottom: 30, left: 50},
          w = width - margin.right - margin.left,
          h = height - margin.top - margin.bottom

        var lastOver = null;

        var x = d3.time.scale()
            .range([margin.left, w]);

        var y = d3.scale.linear()
            .domain([0,1])
            .range([h, 0]);

        var color = function(d){ return colors[d]; };//d3.scale.ordinal().range(['#6CC5F0','#F0965B']) //d3.scale.category10(); 

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        data.forEach(function(d) {
          d.date = new Date(d.start);
        });

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        var area = d3.svg.area()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y0(h)
            .y1(function(d) { return y(d.value); });

        //color.domain(d3.keys(data[0]).filter(function(key) { return activities.indexOf(key) != -1; }));

        if (!scales) scales = {};

        var lines = activities.map(linesAccessor);

        x.domain(d3.extent(data, function(d) { return d.date; }));

       /*y.domain([
          d3.min(lines, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
          d3.max(lines, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
        ]);*/


        /* Areas */

        var activity = selection.selectAll(".activity")
          .data(lines)

        activity.enter().append("g")
          .attr("class", "activity");

        activity.exit().remove();

        var path = activity.selectAll("path")
          .data(function(d){ return [d];})

        path
          .style("stroke", function(d) { return color(d.name); })
          .transition()
            .attr("d", function(d) { return line(d.values); })

        path.enter().append("path")
          .attr("class", "area")
          .style("stroke", function(d) { return color(d.name); })
          .transition()
            .attr("d", function(d) { return line(d.values); })

        path.exit().remove();

        /* Axis */

        selection.selectAll("g.axis.x").remove();

        selection.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);

        var startExtent = d3.max([startBrush, data[0].date]),
            endExtent = d3.min([endBrush,data[data.length-1].date]);

        selection.selectAll(".highlight").remove();

        /* Highlight line */

        var highlightLine =  selection.append("line")
          .attr("class","highlight")
          .attr("x1", margin.left)
          .attr("x2", margin.left)
          .attr("y1", h)
          .attr("y2", 0)
          .style("display", "none")

        selection.on("mousemove.highlight", highlight);
        selection.on("mouseover.highlight", function(){ selection.select(".highlight").style("display",""); dispatch.highlight(null);});
        selection.on("mouseout.highlight", function(){ selection.select(".highlight").style("display","none"); dispatch.highlight(null); });

        /* Mask */

        selection.selectAll("g.mask").remove();

        var mask = new SVGMask(activity)
          .x(x)
          .y(y)
          .reveal([startExtent, endExtent])

        if (brushing) {

          /* Lines */

          var activityLines = selection.selectAll(".activity-lines")
            .data(lines)

          activityLines.enter().append("g")
            .attr("class", "activity-lines");

          activityLines.exit().remove();

          var pathLines = activityLines.selectAll("path")
            .data(function(d){ return [d];})

          pathLines
            .style("stroke", function(d) { return color(d.name); })
            .transition()
              .attr("d", function(d) { return line(d.values); })

          pathLines.enter().append("path")
            .attr("class", "line")
            .style("stroke", function(d) { return color(d.name); })
            .transition()
              .attr("d", function(d) { return line(d.values); })

          pathLines.exit().remove();

          /* Brush */
        
          var brush = d3.svg.brush()
            .x(x)
            .on("brush", function(d){
              mask.reveal(brush.extent());
            })
            .on("brushend", function(d){
              if (brush.empty())  dispatch.brushed([d3.min(data, function(d){ return new Date(d.start); }), d3.max(data, function(d){ return new Date(d.end); })])
              else dispatch.brushed(brush.extent()); 
            });

         
          selection.selectAll("g.brush").remove();

          var brushNode = selection.append("g")
            .attr("class", "x brush")
            .call(brush.extent([startExtent, endExtent]))
          
          brushNode.selectAll("rect")
            .attr("y", -6)
            .attr("height", h + 7)
            
          brushNode.selectAll(".resize").append("path")
            .attr("d", resizePath);
            

          //brushNode.exit().remove();

        }


        function highlight() {

          if (d3.event.offsetX < margin.left)  {
            selection.select(".highlight").style("display","none")
            dispatch.highlight(null);
            return;
          }
          else selection.select(".highlight").style("display","")

          selection.select(".highlight")
           // .transition()
           // .duration(100)
            .attr("x1", d3.event.offsetX)
            .attr("x2", d3.event.offsetX)

          var t = x.invert(d3.event.offsetX),
            values = {};

          lines.forEach(function(d){
            var i = 0;
            for (i in d.values) {
              if (d.values[i].date > t) break;
            }
            values[d.name] = scales[d.name].invert(d.values[i].value);
          })

          dispatch.highlight(values);

        }

        function resizePath(d) {
          var e = +(d == "e"), x = e ? 1 : -1, y = (h+7)/3;
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

    function linesAccessor(name) {
      return 0;
    }

    vis.startBrush = function(_start){
      if (!arguments.length) return startBrush;
      startBrush = _start;
      return vis;
    }

    vis.endBrush = function(_end){
      if (!arguments.length) return endBrush;
      endBrush = _end;
      return vis;
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
    
    vis.linesAccessor = function(_lines){
      if (!arguments.length) return linesAccessor;
      linesAccessor = _lines;
      return vis;
    }

    vis.brushing = function(_brushing){
      if (!arguments.length) return brushing;
      brushing = _brushing;
      return vis;
    }

    vis.scales = function(key, value){
      if (!arguments.length) return scales;
      if (arguments.length === 1) return scales[key];
      scales[key] = value;
      return vis;
    }

    vis.colors = function(_colors){
      if (!arguments.length) return colors;
      colors = _colors;
      return vis;
    }

    d3.rebind(vis, dispatch, 'on');

    return vis;
  }

})();
