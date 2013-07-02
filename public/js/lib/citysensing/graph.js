(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.graph = function(){

  	var graph = {},
      sig,
      monitor;

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
			       //minEdgeSize: 1,
			       //maxEdgeSize: 20
			     })

      		.mouseProperties({
			      maxRatio: 4
			    })

			//    .configProperties({
			//			auto : false,
			//			drawLabels : true,
			//			drawHoverNodes: true,
			//    })


		 // Bind events :
		 sig.bind('overnodes',function(event){
		 	var nodes = event.content;
		 	var neighbors = {};
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
		 }).bind('outnodes',function(){
		 	sig.iterEdges(function(e){
		 		e.hidden = 0;
		 	}).iterNodes(function(n){
		 		n.hidden = 0;
		 	}).draw(2,2,2);
		 });

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
							{size: edgeValue(d.value), color:"rgba(165,165,165,0.25)" }
						)
	      	});

	    sig.iterNodes(function(node){
        		node.size = node.inDegree;
      	});


        sig.startForceAtlas2();

    		prevSpeed = 1
    		prevDiff = 0

        //monitor = window.setInterval(checkSpeed, 1000);

        function checkSpeed(){

        	var speed = sig.forceatlas2.p.speed;

        	// Global cooling (homebrew to check)
        	var diff = Math.abs(prevSpeed - speed);
        	console.log(diff, prevDiff, speed, Math.sqrt(data.nodes.length) / 100, speed/data.nodes.length)
        	if (diff <= prevDiff) {
        		if (speed < 0.0045) {
        			vis.stop();
        		}
        	}
        	prevDiff = diff;
        	prevSpeed = speed;

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

    vis.start = function(){
    	sig.startForceAtlas2();
      return vis;
    }

    vis.stop = function(){
    	sig.stopForceAtlas2();
    	//window.clearInterval(monitor);
      return vis;
    }

  	return vis;

	}

})();