(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.map = function(){

    var grid,
        zoom = 13,
        minZoom = 11,
        maxZoom = 17,
        dragging = false,
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
        //colorRange = ['red','green'],
        //sizeRange = [0.1,1],
        //colorScale,
        //sizeScale,
        baseLayers = {
          "Map": l
        },
        dispatch = d3.dispatch("selected"),
        collection;

    m.addLayer(l);

    //L.control.layers({},baseLayers).addTo(m);


    function map(selection){
      selection.each(function(data){

        var tiles = new L.TileLayer.Canvas();
        tiles.drawTile = function (canvas, tile, zoom) {
        var context = canvas.getContext('2d');

        };

        collection = topojson.feature(grid, grid.objects.grid);

        var path = d3.geo.path().projection(project),
            bounds = d3.geo.bounds(collection);

        //var colorScale = d3.scale.quantile().range(colorRange).domain([ d3.min(data, color), d3.mean(data, color), d3.max(data, color) ]),
        //    sizeScale = d3.scale.linear().range(sizeRange).domain([ d3.min(data, size), d3.max(data, size) ]);

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
        m.on("dragstart",function(){ dragging = true; })
        m.on("dragend",function(){ dragging = false; })


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

          var filtered = collection.features.filter(function(d){
              var centroid = d3.geo.centroid(d);
              return bb.contains(new L.LatLng(centroid[1], centroid[0]));
            });

          // the cells
          
          var feature = g.selectAll("g.cell")
            .data(filtered);

          feature.popover(popover)

          feature.enter().append("g")
            .attr("class","cell")
            .on("mouseup", click)
          
          feature.popover(popover)

          feature.exit().remove()

          var fronts = feature.selectAll("path.front")
            .data(function(d){ return [d]; })

          fronts
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
            //.attr("d", path)

          fronts.enter().append("path")
            .attr("class","front")
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
            //.attr("d", path)

          fronts.exit().remove()

          var backs = feature.selectAll("path.back")
            .data(function(d){ return [d]; })

          backs
            //.attr("d", path)

          backs.enter().append("path")
            .attr("class","back")
            //.attr("d", path)

          backs.exit().remove()


          // update colors
          updateSelected();
         

          /* onClick */

          function click(d) {
            if (dragging) return;
            dispatch.selected(d.properties.id);
            d.properties.selected = !d.properties.selected;
            updateSelected();
          }


          function updateSelected(){
            var sel = selected();
            feature
              .classed("selected", function(d){ 
                return sel && d.properties.selected;
              })
          }

        }

        function project(x) {
          var point = m.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
          return [point.x, point.y];
        }


      })
    }

    function selected(d){
      var s = collection.features.filter(function(d){
        return d.properties.selected === true;
      });
      return (s.length != 0);
    }

    function color(d){
      return d.color;
    }

    function size(d){
      return d.size;
    }

    function popover(d){
      return {};
    }

    map.grid = function(x){
      if (!arguments.length) return grid;
      grid = x;
      return map;
    }

    map.selected = function(x){
      if (!arguments.length) return selected;
      selected = x;
      return map;
    }

    map.popover = function(x){
      if (!arguments.length) return popover;
      popover = x;
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

    map.colorScale = function(x){
      if (!arguments.length) return colorScale;
      colorScale = x;
      return map;
    }

    map.sizeScale = function(x){
      if (!arguments.length) return sizeScale;
      sizeScale = x;
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
