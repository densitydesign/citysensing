var margin = {top: 20, right: 20, bottom: 40, left: 90},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var graph = d3.select("#viz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var heightBar = height/2;
    var originValue = "national";
    //var originValue = "international";
    var json;

    var x = d3.scale.ordinal()
      .rangeBands([0, width], .2);

    var y = d3.scale.linear()
      .range([heightBar, 0]);
    
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(function (d) {
          if ((d / 1000) >= 1) {
            d = d / 1000 + " K";
          }
          return d;
        });

    d3.json("call_data.json", function(json) {
      data = json;

      if (originValue=="international") {
        data = json.contactsChart.filter(function(e){ return e.location==="international"; })
        var xDomain = d3.nest().key(function(d){return d.letterCode}).entries(data).map(function(d){ return  d.key })
        var yMax = d3.max(data, function(d){ return d.count})
        var dataOut = data.filter(function(e){ return e.type==="out"; })
        var dataIn = data.filter(function(e){ return e.type==="in"; })
      } else {
        data = json.contactsChart.filter(function(e){ return e.location==="national"; })
        var xDomain = d3.nest().key(function(d){return d.letterCode}).entries(data).map(function(d){ return  d.key })
        var yMax = d3.max(data, function(d){ return d.count})
        var dataOut = data.filter(function(e){ return e.type==="out"; })
        var dataIn = data.filter(function(e){ return e.type==="in"; })
      }

      x.domain(xDomain)
      graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightBar + ")")
        .call(xAxis);

      //The In Bars
      y.domain([0,yMax])
      graph.append("g")
        .attr("class", "yIN axis")
        .call(yAxis)
      var bars = graph.append("g")
             .attr("class", "inBars")
           .selectAll(".barIn")
            .data(dataIn)
          .enter().append("rect")
            .attr("class", ".barIn")
            .attr("x", function(d) { return x(d.letterCode); })
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return heightBar - y(d.count); })
            .attr("width", x.rangeBand())
            .attr("fill", "#D35530")
            .attr("opacity", "1")

      //The Out Bars
      y.domain([yMax,0])
      graph.append("g")
        .attr("class", "yOUT axis")
        .call(yAxis);
      var bars = graph.append("g")
            .attr("class", "outBars")
          .selectAll(".barOut")
            .data(dataOut)
          .enter().append("rect")
            .attr("class", ".barOut")
            .attr("x", function(d) { return x(d.letterCode); })
            .attr("y", "0")
            .attr("height", function(d) { return y(d.count); })
            .attr("width", x.rangeBand())
            .attr("fill", "#7CA49E")
            .attr("opacity", "1")
      bars.attr("transform", "translate(0,"+ (heightBar + 24) +")");
      d3.select(".yOUT").attr("transform", "translate(0,"+ (heightBar + 24) +")");

      //Styling stuff
      d3.selectAll(".axis > g > text")
        .style("fill","#888")
        .style("font-size","10px")
        .style("font-family","Open Sans, Arial, sans-serif");      
      d3.selectAll(".axis > .domain")
        .style("fill", "none")
        .style("stroke","#888")
        .style("stroke-width","0")
        .style("shape-rendering","crispEdges")
    });