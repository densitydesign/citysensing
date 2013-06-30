(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.graph = function(){

  	var width = 900,
      height = 100,
      graph = {},
      sig;

  	function vis(selection){
      selection.each(function(data){

      	sig = sigma.init(selection.node())
      		.drawingProperties({
						/*
						defaultLabelColor: '#444444',
						defaultLabelSize: 0,
						defaultLabelBGColor: '#ff0000',//'rgba(0,0,0,0)',
						labelHoverBGColor: 'rgba(0,0,0,0)',
						defaultLabelHoverColor : 'rgba(0,0,0,0)',
						labelThreshold: 6,
						labelHoverShadow: false,
						defaultEdgeType: 'curve',
						*/
						// -------
						// LABELS:
						// -------
						//   Label color:
						//   - 'node'
						//   - default (then defaultLabelColor
						//              will be used instead)
						defaultLabelSize: 12,
						labelColor: '#000',
						defaultLabelColor: '#000',
						//   Label hover background color:
						//   - 'node'
						//   - default (then defaultHoverLabelBGColor
						//              will be used instead)
						labelHoverBGColor: 'default',
						defaultHoverLabelBGColor: 'rgba(0,0,0,0)',
						//   Label hover shadow:
						labelHoverShadow: false,
						labelHoverShadowColor: '#000',
						//   Label hover color:
						//   - 'node'
						//   - default (then defaultLabelHoverColor
						//              will be used instead)
						labelHoverColor: 'default',
						defaultLabelHoverColor: '#000',
						//   Label active background color:
						//   - 'node'
						//   - default (then defaultActiveLabelBGColor
						//              will be used instead)
						labelActiveBGColor: 'default',
						defaultActiveLabelBGColor: '#fff',
						//   Label active shadow:
						labelActiveShadow: false,
						labelActiveShadowColor: '#000',
						//   Label active color:
						//   - 'node'
						//   - default (then defaultLabelActiveColor
						//              will be used instead)
						labelActiveColor: 'default',
						defaultLabelActiveColor: '#000',
						//   Label size:
						//   - 'fixed'
						//   - 'proportional'
						//   Label size:
						//   - 'fixed'
						//   - 'proportional'
						labelSize: 'fixed',
						labelSizeRatio: 2,    // for proportional display only
						labelThreshold: 0,
						defaultEdgeType: 'curve',
						borderSize: 1,
						nodeBorderColor: '#fff',
						defaultNodeBorderColor: '#fff'
      		})

      		.graphProperties({
			       minNodeSize: 4,
			       maxNodeSize: 10
			      // minEdgeSize: 1,
			      // maxEdgeSize: 20
			     })

      		.mouseProperties({
			      maxRatio: 4
			    })

			    .configProperties({
						auto : false,
						drawLabels : true,
						drawHoverNodes: true,
			    })

			  var edgeValue = d3.scale.linear().domain([ d3.min(data.links, function(d){return d.value; }), d3.max(data.links, function(d){return d.value; })]).range([1,20])

      	data.nodes.forEach(function(d,i){
      		sig.addNode(d.id, {
      			'x': Math.random(),
	  	      'y': Math.random(),
	  	      'size': 10,
				 		'color': "grey",
				 		'label' : d.label
      		})
      	});

      	data.links
      		.sort(function(a,b){ return b.value - a.value; })
      		.slice(1,1000)
      		.forEach(function(d,i){
	      		sig.addEdge(
							i,
							d.source,
							d.target,
							edgeValue(d)
							//{weight: edgeValue(d) }
						)
	      	});

        sig.startForceAtlas2();
			

					/*
					defaultLabelColor: '#444444',
			       defaultLabelSize: 0,
			       defaultLabelBGColor: '#ff0000',//'rgba(0,0,0,0)',
				   labelHoverBGColor: 'rgba(0,0,0,0)',
			       defaultLabelHoverColor : 'rgba(0,0,0,0)',
			       labelThreshold: 6,
				   labelHoverShadow: false,
			       defaultEdgeType: 'curve',
				   
			       // -------
			       // LABELS:
			       // -------
			       //   Label color:
			       //   - 'node'
			       //   - default (then defaultLabelColor
			       //              will be used instead)
			       defaultLabelSize: 12,
			       labelColor: '#000',
			       defaultLabelColor: '#000',
			       //   Label hover background color:
			       //   - 'node'
			       //   - default (then defaultHoverLabelBGColor
			       //              will be used instead)
			       labelHoverBGColor: 'default',
			       defaultHoverLabelBGColor: 'rgba(0,0,0,0)',
			       //   Label hover shadow:
			       labelHoverShadow: false,
			       labelHoverShadowColor: '#000',
			       //   Label hover color:
			       //   - 'node'
			       //   - default (then defaultLabelHoverColor
			       //              will be used instead)
			       labelHoverColor: 'default',
			       defaultLabelHoverColor: '#000',
			       //   Label active background color:
			       //   - 'node'
			       //   - default (then defaultActiveLabelBGColor
			       //              will be used instead)
			       labelActiveBGColor: 'default',
			       defaultActiveLabelBGColor: '#fff',
			       //   Label active shadow:
			       labelActiveShadow: false,
			       labelActiveShadowColor: '#000',
			       //   Label active color:
			       //   - 'node'
			       //   - default (then defaultLabelActiveColor
			       //              will be used instead)
			       labelActiveColor: 'default',
			       defaultLabelActiveColor: '#000',
			       //   Label size:
			       //   - 'fixed'
			       //   - 'proportional'
			       //   Label size:
			       //   - 'fixed'
			       //   - 'proportional'
			       labelSize: 'fixed',
			       labelSizeRatio: 2,    // for proportional display only
			       labelThreshold: 0,
				   defaultEdgeType: 'curve',
			       borderSize: 2,
			       nodeBorderColor: '#fff',
			       defaultNodeBorderColor: '#fff'


			     }).graphProperties({
			       minNodeSize: 4,
			       maxNodeSize: 10,
			       minEdgeSize: 1,
			       maxEdgeSize: 20
			     }).mouseProperties({
			       maxRatio: 4
			     }).configProperties({
					 auto : false,
					 drawLabels : true,
					 drawHoverNodes: true,
					 //drawActiveNodes: true
			     })
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

    vis.start = function(){
    	sig.startForceAtlas2();
      return vis;
    }

    vis.stop = function(){
    	sig.stopForceAtlas2();
      return vis;
    }



  	return vis;

	}

})();


/*
sven.viz.graph = function(){

		var graph = {},
			sig,
			center,
			zoomIn,
			zoomOut,
			target,
			nodes = [],
			nodesIndex = {},
			edges = [],
			edgesIndex = {},
			clusters,
			size,
			color = d3.scale.category20(),
			id,
			label,
			event = d3.dispatch(
				"nodeDown",
				"nodeUp"
			)


		graph.center = function(){
			sig.position(0,0,1).draw();
			return graph;
		}

		graph.zoomIn = function(){
			var a = sig._core;
	    	sig.zoomTo(a.domElements.nodes.width / 2, a.domElements.nodes.height / 2, a.mousecaptor.ratio * (1.5));
			return graph;
		}

		graph.zoomOut = function(){
			var a = sig._core;
	    	sig.zoomTo(a.domElements.nodes.width / 2, a.domElements.nodes.height / 2, a.mousecaptor.ratio * (0.5));
			return graph;
		}

		graph.target = function(x){
			if (!arguments.length) return target;
			target = x;
			return graph;
		}

		graph.id = function(x){
			if (!arguments.length) return id;
			id = x;
			return graph;
		}

		graph.label = function(x){
			if (!arguments.length) return label;
			label = x;
			return graph;
		}


		graph.on = function(type, listener){
			if (arguments.length < 2) return;
			event.on(type,listener)
			return graph;
		}

		graph.getEdges = function(){
			return edges;
		}

		graph.getNodes = function(){
			return nodes;
		}


		graph.addNode = function(data){

			idNode = id ? id(data) : 'undefined_' + nodes.length;
			if (nodesIndex[idNode]) return;

			// TODO: mah...

			sig.addNode(idNode,{
	  	         'x': Math.random(),
	  	         'y': Math.random(),
	  	         'size': data.size,
				 //'color': color(idNode),
				 'color': "grey",
				 'label' : label(data)
	  	       });
			   nodes.push(data);
			   nodesIndex[idNode] = data;

	  	     sig.startForceAtlas2();
			 return graph;

		}

		graph.removeNode = function(data){

			sig.dropNode();// con id
		}


		graph.addEdge = function(source, target, properties){
			sig.addEdge(
				Math.random(),
				id(source),
				id(target),
				properties
			)

			sig.startForceAtlas2();
		}


		function updateEdges(){

		}

		graph.start = function() {
			sig.startForceAtlas2();
		}

		graph.stop = function() {
			sig.stopForceAtlas2();
		}

		graph.init = function(){

			sig = sigma.init(d3.select(target).node())
				.drawingProperties({
					/*
					defaultLabelColor: '#444444',
			       defaultLabelSize: 0,
			       defaultLabelBGColor: '#ff0000',//'rgba(0,0,0,0)',
				   labelHoverBGColor: 'rgba(0,0,0,0)',
			       defaultLabelHoverColor : 'rgba(0,0,0,0)',
			       labelThreshold: 6,
				   labelHoverShadow: false,
			       defaultEdgeType: 'curve',
				   
			       // -------
			       // LABELS:
			       // -------
			       //   Label color:
			       //   - 'node'
			       //   - default (then defaultLabelColor
			       //              will be used instead)
			       defaultLabelSize: 12,
			       labelColor: '#000',
			       defaultLabelColor: '#000',
			       //   Label hover background color:
			       //   - 'node'
			       //   - default (then defaultHoverLabelBGColor
			       //              will be used instead)
			       labelHoverBGColor: 'default',
			       defaultHoverLabelBGColor: 'rgba(0,0,0,0)',
			       //   Label hover shadow:
			       labelHoverShadow: false,
			       labelHoverShadowColor: '#000',
			       //   Label hover color:
			       //   - 'node'
			       //   - default (then defaultLabelHoverColor
			       //              will be used instead)
			       labelHoverColor: 'default',
			       defaultLabelHoverColor: '#000',
			       //   Label active background color:
			       //   - 'node'
			       //   - default (then defaultActiveLabelBGColor
			       //              will be used instead)
			       labelActiveBGColor: 'default',
			       defaultActiveLabelBGColor: '#fff',
			       //   Label active shadow:
			       labelActiveShadow: false,
			       labelActiveShadowColor: '#000',
			       //   Label active color:
			       //   - 'node'
			       //   - default (then defaultLabelActiveColor
			       //              will be used instead)
			       labelActiveColor: 'default',
			       defaultLabelActiveColor: '#000',
			       //   Label size:
			       //   - 'fixed'
			       //   - 'proportional'
			       //   Label size:
			       //   - 'fixed'
			       //   - 'proportional'
			       labelSize: 'fixed',
			       labelSizeRatio: 2,    // for proportional display only
			       labelThreshold: 0,
				   defaultEdgeType: 'curve',
			       borderSize: 2,
			       nodeBorderColor: '#fff',
			       defaultNodeBorderColor: '#fff'


			     }).graphProperties({
			       minNodeSize: 4,
			       maxNodeSize: 10,
			       minEdgeSize: 1,
			       maxEdgeSize: 20
			     }).mouseProperties({
			       maxRatio: 4
			     }).configProperties({
					 auto : false,
					 drawLabels : true,
					 drawHoverNodes: true,
					 //drawActiveNodes: true
			     })

			/* Mouse listeners 

			sig.bind("downnodes",function(d){
				console.log(d3.event)
				mouse = sig.getMouse()
				d3.select("#pop-up")
				.style("left", mouse.mouseX+"px")
				.style("top", mouse.mouseY+"px")
				.style("display","block")
				
				event.nodeDown(nodesIndex[d.content[0]]);
			})
			
			sig.bind("upnodes",function(d){
				console.log('up',d)
			})
			
			

			// sig.bind('overnodes', function(event){

			var clicked = false;
					// Bind events :
			  sig.bind('downnodes',function(event){
				var nodes = event.content;
				var neighbors = {};

				if(!clicked){
				sig.iterEdges(function(e){
				  if(nodes.indexOf(e.source)>=0 || nodes.indexOf(e.target)>=0){
					neighbors[e.source] = 1;
					neighbors[e.target] = 1;
				  }
				}).iterNodes(function(n){
				  if(!neighbors[n.id]){
					n.hidden = 1;
				  }else{
					n.hidden = 0;
				  }
				}).draw(2,2,2);
				clicked = true;
				}
				else{
					sig.iterEdges(function(e){
				  e.hidden = 0;
				}).iterNodes(function(n){
				  n.hidden = 0;
				}).draw(2,2,2);
				clicked = false;
					}
			  })

			return graph;
		}


	return graph;



	}*/