(function(){

  var citysensing = window.citysensing = {};

  citysensing.map = function(){

    var grid,
        zoom = 14,
        minZoom = 12,
        maxZoom = 17;

    function map(selection){
      selection.each(function(data){

        var l = new L.StamenTileLayer("toner-lite"),
            m = new L.Map("map", {
            center: new L.LatLng(45.4640, 9.1916),
            zoom: zoom,
            minZoom : minZoom,
            maxZoom : maxZoom
        });

        var grid_geojson = topojson.feature(grid, grid.objects.grid);

        m.addLayer(l);


      })
    }

    map.grid = function(x){
      if (!arguments.length) return grid;
      grid = x;
      return map;
    }

    map.minZoom = function(x){
      if (!arguments.length) return minZoom;
      minZoom = x;
      return map;
    }

    map.maxZoom = function(x){
      if (!arguments.length) return maxZoom;
      maxZoom = x;
      return map;
    }

    map.zoom = function(x){
      if (!arguments.length) return zoom;
      zoom = x;
      return map;
    }

    return map;
  }



})();

/*

d3.json('static/client/grid/grid_t.json', function (data) {

	var layer = new L.StamenTileLayer("toner-lite");

	var map = new L.Map("map", {
    	center: new L.LatLng(45.4640, 9.1916),
    	zoom: 14,
    	minZoom:12,
    	maxZoom:17
	});

  var grid_geojson = topojson.feature(data, data.objects.grid)

  var anomaly = d3.scale.ordinal().range(["#FEF0D9","#FDCC8A","#FC8D59","#E34A33","#B30000"]).domain([0,1,2,3,4])
  var sentiment = d3.scale.ordinal().range(["#1A9641","#D7191C"]).domain([0,1])
  var amount = d3.scale.ordinal().range([0.3,0.7,1]).domain([0,1,2])

   var path = d3.geo.path().projection(project);

 // var grid_layer = L.geoJson(grid_geojson, {
 //        style: function (feature) {
 //        		//console.log(feature.properties.id)
 //                var centroid = path.centroid(feature),
 //                x = centroid[0],
 //                y = centroid[1];

 //              var transform =  "translate(" + x + "," + y + ")"
 //                + "scale(" + amount(Math.round(Math.random()*2)) + ")"
 //                + "translate(" + -x + "," + -y + ")";

 //                console.log(transform)

 //        		return {color: '#666',weight: 1, opacity: 1,fillOpacity: 0.3, 'transform': transform};
 //    		}
 //    })



  // var d3Layer = new L.GeoJSON.d3(data,
  //     {
  //     style:function(feature){
  //           var fill = sentiment(Math.round(Math.random()));
  //           return {'fill': fill,'fill-opacity': 0.7,'stroke': 'white',"stroke-width":1};
  //       },
  //     tFeature:"grid"
  //     }
  //   );
  //map.addLayer(grid_layer);
	map.addLayer(layer);


 var bb = map.getBounds();

	var svg = d3.select(map.getPanes().overlayPane).append("svg");

	g=svg.append("g").attr("class", "leaflet-zoom-hide");

	var bounds = d3.geo.bounds(grid_geojson)
	var path = d3.geo.path().projection(project);

	var feature = g.selectAll("path")
    	.data(grid_geojson.features)
  		.enter().append("path")
  			.attr("fill",function(d){ 
  				return sentiment(Math.round(Math.random()));
  				})
  			.attr("fill-opacity", 0.7)
  			.attr("stroke", "white")
  			.attr("stroke-width", 1)
        // .filter(function(d){
        //     var centroid = d3.geo.centroid(d);
        //     var latlng = new L.LatLng(centroid[1], centroid[0]);
        //     var inside = bb.contains(latlng);
        //     return inside
        //   })
  	
  	map.on("viewreset", reset);
  	reset();

  	d3.selectAll("input").on("change", function(d){

		if(this.value == "anomaly"){
		 feature.attr("fill",function(d){ 
  				return anomaly(Math.round(Math.random()*4));
  				})
			}
		else{
			feature.attr("fill",function(d){ 
  				return sentiment(Math.round(Math.random()));
  				})
		}
		})

  function reset() {
    var bottomLeft = project(bounds[0]),
        topRight = project(bounds[1]);

    svg.attr("width", topRight[0] - bottomLeft[0])
        .attr("height", bottomLeft[1] - topRight[1])
        .style("margin-left", bottomLeft[0] + "px")
        .style("margin-top", topRight[1] + "px");

    g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

    bb = map.getBounds();

  	feature.attr("transform", function(d) {
         		var centroid = path.centroid(d),
             	x = centroid[0],
             	y = centroid[1];

         		return "translate(" + x + "," + y + ")"
             	+ "scale(" + amount(Math.round(Math.random()*2)) + ")"
             	+ "translate(" + -x + "," + -y + ")";
			     })
  			.attr("d", path)
   }

       function project(x) {
   		var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
   		return [point.x, point.y];
	 }

	

});
*/