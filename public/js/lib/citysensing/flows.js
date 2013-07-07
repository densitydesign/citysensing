(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.flows = function(){

  	var width,
  			height;

    function vis(selection){
      selection.each(function(data){


      	data.nodes.forEach(function(d,i){
          d.name = d.id;
          d.id = i;
        })

      	var nodesObject = data.nodes.map(function(d){ return d.name; });

      	//data.links = data.links.slice(0,100)

        data.links.forEach(function(d){
          d.source = nodesObject.indexOf(d.source);
          d.target = nodesObject.indexOf(d.target);
        })

        var formatNumber = d3.format(",.0f"),
			    	format = function(d) { return formatNumber(d); };

      	var sankey = d3.sankey()
			    .size([width, height])
			    .nodeWidth(15)
			    .nodePadding(10)
			    .nodes(data.nodes)
			    .links(data.links)
			    .layout(32);

			  console.log(data.nodes)

			  var path = sankey.link();

			  var link = selection.selectAll(".link")
			  	.data(data.links)
			    .sort(function(a, b) { return b.dy - a.dy; });

			  link
			    .attr("d", path )
			    .style("stroke-width", function(d) { return Math.max(1, d.dy); })


			  link.enter().append("path")
			    .attr("class", "link")
			    .attr("d", path )
			    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
			    .style("fill","none")
			    .style("stroke","#000")
			    .style("stroke-opacity",".2")

			  link.exit().remove();

			  var title = link.selectAll("title")
			  	.data(function(d){ return [d]; })				

			  title
			  		.text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

				title.enter().append("title")
				    .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

				title.exit().remove();

				var node = selection.selectAll(".step")
			    .data(data.nodes)

			 	node
			 		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			 		.call(d3.behavior.drag()
		      		.origin(function(d) { return d; })
		      		.on("dragstart", function() { this.parentNode.appendChild(this); })
		      		.on("drag", dragmove));

			  node
			    .enter().append("g")
		      	.attr("class", "step")
		      	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		    		.call(d3.behavior.drag()
		      		.origin(function(d) { return d; })
		      		.on("dragstart", function() { this.parentNode.appendChild(this); })
		      		.on("drag", dragmove));

		   	node.exit().remove();

		   	var rect = node.selectAll("rect")
		   		.data(function(d){ return [d]; })

		   	rect
		   		.attr("height", function(d) { return d.dy; })
			    .attr("width", sankey.nodeWidth())
			    .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })

		   	rect.enter().append("rect")
				    .attr("height", function(d) { return d.dy; })
				    .attr("width", sankey.nodeWidth())
				    .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
				    .style("shape-rendering","crispEdges")
				    .style("cursor","ns-resize")

				rect.exit().remove();

				var text = node.selectAll("text")
					.data(function(d){ return [d]; })

				text
	      	.attr("y", function(d) { return d.dy / 2; })
			    .text(function(d) { return d.name; })
			    .filter(function(d) { return d.x < width / 2; })
			    .attr("x", 6 + sankey.nodeWidth())
			   	.attr("fill","#000000")

				text.enter().append("text")
			    .attr("x", -6)
			    .attr("fill","#000000")
	      	.attr("y", function(d) { return d.dy / 2; })
	      	.attr("dy", ".35em")
	      	.attr("text-anchor", "end")
	      	.attr("transform", null)
			    .text(function(d) { return d.name; })
			    .style("font-size","11px")
					.style("font-family","Arial, Helvetica, sans-serif")
			    .style("pointer-events","none")
			    .filter(function(d) { return d.x < width / 2; })
			    .attr("x", 6 + sankey.nodeWidth())
			    .attr("text-anchor", "start");

			  text.exit().remove();

				function dragmove(d) {
				    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
				    sankey.relayout();
				    link.attr("d", path);
				}

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

		return vis;

	}

})();


/*

var model = this.model,
				style = this.style

			var formatNumber = d3.format(",.0f"),
			    format = function(d) { return formatNumber(d) + " TWh"; },
			    width = style.width.value - style.margin.value,
			    height = style.height.value - style.margin.value;

			var svg = target.append("svg")
			    .attr("width", width + style.margin.value +1 )
			    .attr("height", height + style.margin.value +1 )
			  	.append("g")
			    .attr("transform", "translate(" + style.margin.value + "," + style.margin.value + ")");

			var sankey = d3.sankey()
			    .nodeWidth(style.nodeWidth.value)
			    .nodePadding(style.nodePadding.value)
			    .size([width, height]);

			var path = sankey.link();

			var nodes = model.applyOn(data).nodes,
				links = model.applyOn(data).links;

			sankey
			    .nodes(nodes)
			    .links(links)
			    .layout(32);

			var link = svg.append("g").selectAll(".link")
			    .data(links)
			   	.enter().append("path")
			    .attr("class", "link")
			    .attr("d", path )
			    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
			    .style("fill","none")
			    .style("stroke","#000")
			    .style("stroke-opacity",".2")
			    .sort(function(a, b) { return b.dy - a.dy; });

			link.append("title")
			    .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

			var node = svg.append("g").selectAll(".node")
			    .data(nodes)
			    .enter().append("g")
			      	.attr("class", "node")
			      	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			    	.call(d3.behavior.drag()
			      		.origin(function(d) { return d; })
			      		.on("dragstart", function() { this.parentNode.appendChild(this); })
			      		.on("drag", dragmove));

			var color = raw.diverging(raw.countUnique(nodes.map(function(d){ return { name: d.name.replace(/ ., "") }; }), "name"));

			node.append("rect")
			    .attr("height", function(d) { return d.dy; })
			    .attr("width", sankey.nodeWidth())
			    .style("fill", function(d) { return d.color = color(d.name.replace(/ ., "")); })
			    .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
			    .style("shape-rendering","crispEdges")
			    .style("cursor","ns-resize")
			    .append("title")
			    .text(function(d) { return d.name + "\n" + format(d.value); });

			node.append("text")
			    .attr("x", -6)
		      	.attr("y", function(d) { return d.dy / 2; })
		      	.attr("dy", ".35em")
		      	.attr("text-anchor", "end")
		      	.attr("transform", null)
			    .text(function(d) { return d.name; })
			    .style("font-size","11px")
				.style("font-family","Arial, Helvetica, sans-serif")
			    .style("pointer-events","none")
			    .filter(function(d) { return d.x < width / 2; })
			    	.attr("x", 6 + sankey.nodeWidth())
			     	.attr("text-anchor", "start");

			function dragmove(d) {
			    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
			    sankey.relayout();
			    link.attr("d", path);
			}


			return this;

*/