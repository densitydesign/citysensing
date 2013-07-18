(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.map = function(){

    var grid,
        zoom = 13,
        minZoom = 11,
        maxZoom = 17,
        coordinates = [45.4640, 9.1916],
        l = new L.StamenTileLayer("toner-lite"),
        m = new L.Map("map", {
            center: new L.LatLng(coordinates[0], coordinates[1]),
            zoom: zoom,
            minZoom : minZoom,
            maxZoom : maxZoom,
            scrollWheelZoom : false
        }),
        showMap = true,
        colorRange = ['red','green'],
        sizeRange = [0.1,1],
        baseLayers = {
          "Map": l
        },
        dispatch = d3.dispatch("selected");

    m.addLayer(l);

    //L.control.layers({},baseLayers).addTo(m);


    function map(selection){
      selection.each(function(data){

        var collection = topojson.feature(grid, grid.objects.grid),
            path = d3.geo.path().projection(project),
            bounds = d3.geo.bounds(collection);

        var colorScale = d3.scale.quantile().range(colorRange).domain([ d3.min(data, color), d3.mean(data, color), d3.max(data, color) ]),
          sizeScale = d3.scale.linear().range(sizeRange).domain([ d3.min(data, size), d3.max(data, size) ]);

        // main overlay
        var svg = d3.select(m.getPanes().overlayPane).selectAll("svg")
            .data([data])
            svg.enter().append("svg");
        
        var g = svg.selectAll("g.leaflet-zoom-hide")
            .data(function(d){ return [d]; })
            g.enter().append("g").attr("class", "leaflet-zoom-hide");

        if (showMap) d3.selectAll(".leaflet-tile-pane")
          .style("opacity",.3)
        else d3.selectAll(".leaflet-tile-pane")
          .style("opacity",0)

        var cells = {};

        data.forEach(function(d){ cells[d.id] = d; });       
        collection.features.forEach(function(d){
          d.properties = cells[d.properties.id];
        });
        collection.features = collection.features.filter(function(d){ return d.properties; })

        m.on("viewreset", drawGrid);
        m.on("moveend", drawGrid);

        drawGrid();

        function drawGrid() {
          
          var bottomLeft = project(bounds[0]),
              topRight = project(bounds[1]),
              bb = m.getBounds();

          svg .attr("width", topRight[0] - bottomLeft[0])
              .attr("height", bottomLeft[1] - topRight[1])
              .style("margin-left", bottomLeft[0] + "px")
              .style("margin-top", topRight[1] + "px");

          g   .attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

          // the cells
          var feature = g.selectAll("path.cell")
            .data(collection.features.filter(function(d){
              var centroid = d3.geo.centroid(d);
              return bb.contains(new L.LatLng(centroid[1], centroid[0]));
            }));

          // update existing
          feature
            .attr("fill",function(d){ 
              return colorScale(color(d.properties));
            })
            .attr("data-title", function(d){return d.properties.id;})
            .attr("data-toggle","tooltip")
            .attr("transform", function(d) {
              var x = path.centroid(d)[0],
                  y = path.centroid(d)[1];
              return  "translate(" + x + "," + y + ")"
                    + "scale(" + sizeScale(size(d.properties)) + ")"
                    + "translate(" + -x + "," + -y + ")";
            })
            .attr("d", path)


          // create new ones...
          feature.enter().append("path")
            .attr("class","cell")
            .attr("data-title", function(d){ return d.properties.id;})
            .attr("data-toggle","tooltip")
            .attr("fill",function(d){ 
              return colorScale(color(d.properties));
            })
            .attr("transform", function(d) {
              var x = path.centroid(d)[0],
                  y = path.centroid(d)[1];
              
              return  "translate(" + x + "," + y + ")"
                    + "scale(" + sizeScale(size(d.properties)) + ")"
                    + "translate(" + -x + "," + -y + ")";
            })
            .attr("d", path)
            .on("click", function(d){
              dispatch.selected(d.properties.id);
              d.properties.selected = !d.properties.selected;
              updateSelected();
            })
            .each(function(d){
              d.properties.selected = false;
            })

          $(".tooltip").remove();

          $(".cell").tooltip({
            'container': 'body',
            'html':'true'
          });

          feature.exit().remove()


          function updateSelected(){

          feature
            .style("fill-opacity",function(d){ 
              return d.properties.selected ? 1 : 0.2
            })
          }

        }

        function project(x) {
          var point = m.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
          return [point.x, point.y];
        }


      })
    }

    function color(d){
      return d.color;
    }

    function size(d){
      return d.size;
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

    map.coordinates = function(x){
      if (!arguments.length) return coordinates;
      coordinates = x;
      return map;
    }

    map.color = function(x){
      if (!arguments.length) return color;
      color = x;
      return map;
    }

    map.size = function(x){
      if (!arguments.length) return size;
      size = x;
      return map;
    }

    map.colorRange = function(x){
      if (!arguments.length) return colorRange;
      colorRange = x;
      return map;
    }

    map.sizeRange = function(x){
      if (!arguments.length) return sizeRange;
      sizeRange = x;
      return map;
    }

    map.showMap = function(x){
      if (!arguments.length) return showMap;
      showMap = x;
      return map;
    }

    d3.rebind(map, dispatch, 'on');

    return map;
  }
  
})();
