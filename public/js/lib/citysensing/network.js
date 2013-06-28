(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.network = function(){

  	var width = 900,
      height = 100;

    function vis(selection){
      selection.each(function(data){

        var nodesObject = data.nodes.map(function(d){ return d.id; });

        data.links = data.links.slice(0,500);//filter(function(d){ return d.value > 1000; })

        data.links.forEach(function(d){
          d.source = nodesObject.indexOf(d.source);
          d.target = nodesObject.indexOf(d.target);
        })


        // scales
        var value = d3.scale.linear()
              .domain([ d3.min(data.links, function(d){ return d.value; }), d3.max(data.links, function(d){return d.value; }) ])
              .range([100,0]),
            
            valueWidth = d3.scale.linear()
              .domain([ d3.min(data.links, function(d){ return d.value; }), d3.max(data.links, function(d){return d.value; }) ])
              .range([1,5]),

            color = d3.scale.category20();


        var force = d3.layout.force()
          .charge(-30)
          .linkDistance(150)//function(d){ return value(d.value); })
          .size([width, height]);


        force
          .nodes(data.nodes)
          .links(data.links)
          .start();

        var link = selection.selectAll(".link")
          .data(data.links)
          .style("stroke-width", function(d) { return valueWidth(d.value); });

        link.enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return valueWidth(d.value); });

        link.exit().remove();

        var node = selection.selectAll(".node")
            .data(data.nodes)
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })

        node.append("title")
            .text(function(d) { return d.name; });

        node.enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
            .call(force.drag);

        node.append("title")
            .text(function(d) { return d.name; });

        node.exit().remove();

        force.on("tick", tick);

        function tick(e) {
          
          var dampenedAlpha = e.alpha * 0.1;
          
          node.each(gravity(dampenedAlpha))
            .each(collide(.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }


        function gravity(alpha) {
          var ax, ay, cx, cy;
          cx = width / 2;
          cy = height / 2;
          ax = alpha / 8;
          ay = alpha;
          return function(d) {
            d.x += (cx - d.x) * ax;
            return d.y += (cy - d.y) * ay;
          };
        };

        function collide(jitter) {
          return function(d) {
            return data.nodes.forEach(function(d2) {
              var distance, minDistance, moveX, moveY, x, y;
              if (d !== d2) {
                x = d.x - d2.x;
                y = d.y - d2.y;
                distance = Math.sqrt(x * x + y * y);
                minDistance = 15;//d.forceR + d2.forceR + collisionPadding;
                if (distance < minDistance) {
                  distance = (distance - minDistance) / distance * jitter;
                  moveX = x * distance;
                  moveY = y * distance;
                  d.x -= moveX;
                  d.y -= moveY;
                  d2.x += moveX;
                  return d2.y += moveY;
                }
              }
            });
          };
        };







	  	});
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

  	//d3.rebind(vis, dispatch, 'on');

  	return vis;

	}

})();