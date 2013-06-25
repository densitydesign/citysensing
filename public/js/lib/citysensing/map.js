(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.map = function(){

    var grid,
        zoom = 14,
        minZoom = 11,
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

        m.addLayer(l);

        var grid_geojson = topojson.feature(grid, grid.objects.grid),
          path = d3.geo.path().projection(project),
          svg = d3.select(m.getPanes().overlayPane).append("svg"),
          g=svg.append("g").attr("class", "leaflet-zoom-hide"),
          bb = m.getBounds(),
          bounds = d3.geo.bounds(grid_geojson);

        var max_social_sentiment = d3.max(data, function(d){return d.social_sentiment}),
          min_social_sentiment = d3.min(data, function(d){return d.social_sentiment}),
          max_social_activity = d3.max(data, function(d){return d.social_activity}),
          min_social_activity = d3.min(data, function(d){return d.social_activity}),
          max_mobily_activity = d3.max(data, function(d){return d.mobily_activity}),
          min_mobily_activity = d3.min(data, function(d){return d.mobily_activity}),
          max_mobily_anomaly = d3.max(data, function(d){return d.mobily_anomaly}),
          min_mobily_anomaly = d3.min(data, function(d){return d.mobily_anomaly});

        

        var anomaly = d3.scale.ordinal().range(["#FEF0D9","#FDCC8A","#FC8D59","#E34A33","#B30000"]).domain([0,1,2,3,4]),
          sentiment = d3.scale.linear().range(["#1A9641","#D7191C"]).domain([min_social_sentiment,max_social_sentiment]),
          amount = d3.scale.linear().range([0.3,1]).domain([min_mobily_activity, max_mobily_activity])

        grid_geojson.features.forEach(function(d){

          var id = d.properties.id;

          var properties = data.filter(function(f){
                return f.id == id;
            })

          if (properties.length){
              d.properties['in'] = true;
            d3.entries(properties[0]).forEach(function(f){
              d.properties[f.key] = f.value;
            })
          }else{
            d.properties['in'] = false;
          }

        });


        m.on("viewreset", drawGrid);
        m.on("moveend", drawGrid);
        drawGrid();

        function drawGrid() {
          
          var bottomLeft = project(bounds[0]),
            topRight = project(bounds[1]);

          svg.attr("width", topRight[0] - bottomLeft[0])
            .attr("height", bottomLeft[1] - topRight[1])
            .style("margin-left", bottomLeft[0] + "px")
            .style("margin-top", topRight[1] + "px");

          g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

          bb = m.getBounds();

          var data = grid_geojson.features.filter(function(d){
            var centroid = d3.geo.centroid(d),
              latlng = new L.LatLng(centroid[1], centroid[0]),
              inside = bb.contains(latlng);
            if (inside && d.properties.in){ return d;}
          })

          var feature = g.selectAll("path")
            .data(data)

          feature.exit().remove()

          feature 
            .attr("fill",function(d){ 
                //return sentiment(Math.round(Math.random()));
                return sentiment(d.properties.social_sentiment);
            }) 
            .attr("transform", function(d) {
              var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];

              return "translate(" + x + "," + y + ")"
             //+ "scale(" + amount(Math.round(Math.random()*2)) + ")"
              + "scale(" + amount(d.properties.mobily_activity) + ")"
              + "translate(" + -x + "," + -y + ")";
            })
            .attr("d", path)
            .enter().append("path")
            .attr("fill",function(d){ 
                //return sentiment(Math.round(Math.random()));
                return sentiment(d.properties.social_sentiment);
            })
            .attr("fill-opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("transform", function(d) {
              var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
              

              return "translate(" + x + "," + y + ")"
              //+ "scale(" + amount(Math.round(Math.random()*2)) + ")"
              + "scale(" + amount(d.properties.mobily_activity) + ")"
              + "translate(" + -x + "," + -y + ")";
            })
            .attr("d", path)
        }

        function project(x) {
          var point = m.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
          return [point.x, point.y];
        }


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
