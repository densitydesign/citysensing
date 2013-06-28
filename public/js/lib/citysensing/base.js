(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.base = function(){

  	var width,
  		dispatch = d3.dispatch("evento")

    function vis(selection){
      selection.each(function(data){

      	pallozzo
      		.on("click", dispatch.evento)

      })
    }

    // Getter & Setter

    vis.width = function(_) {
    	if(!arguments.length) return width;
    	width = _;
    	return vis;
    }

    d3.rebind(vis, dispatch, 'on');

    return vis;
  }

})();



var base = citysensing.base()
	//.on("evento",function(d){ console.log(d); })

selection
	.datum(data)
	.call(base)
