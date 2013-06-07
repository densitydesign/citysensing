(function(){

  var citysensing = window.citysensing = {};

  citysensing.map = function(){

    function map(selection){
      selection.each(function(data){
        console.log(data);
      })
    }   

    return map;
  }

  /* Adding csrf_token to each query */

  $(document).ajaxSend(function(event, xhr, settings) {
      function getCookie(name) {
          var cookieValue = null;
          if (document.cookie && document.cookie != '') {
              var cookies = document.cookie.split(';');
              for (var i = 0; i < cookies.length; i++) {
                  var cookie = jQuery.trim(cookies[i]);
                  // Does this cookie string begin with the name we want?
                  if (cookie.substring(0, name.length + 1) == (name + '=')) {
                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
      function sameOrigin(url) {
        console.log("suca")
          // url could be relative or scheme relative or absolute
          var host = document.location.host; // host + port
          var protocol = document.location.protocol;
          var sr_origin = '//' + host;
          var origin = protocol + sr_origin;
          // Allow absolute or scheme relative URLs to same origin
          return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
              (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
              // or any other URL that isn't scheme relative or absolute i.e relative.
              !(/^(\/\/|http:|https:).*/.test(url));
      }
      function safeMethod(method) {
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
      }

      if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
          xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      }
  });

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