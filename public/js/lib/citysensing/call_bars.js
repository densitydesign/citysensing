(function(){

  var citysensing = window.citysensing || (window.citysensing = {});

  citysensing.callBars = function(){

    var width = 900,
      height = 270,
      originValue = "national";

    d3.select("#callBars > svg")
      .attr("height", height)

    function vis(selection){
      selection.each(function(data){

      var margin = {top: 20, right: 0, bottom: 30, left: 50},
          chartWidth = width - margin.left - margin.right,
          chartHeight = height - margin.top - margin.bottom;

      var chart;

    if(selection.select(".groupChart").empty()){

      chart = selection
        .append("g")
        .attr("class", "groupChart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var legenda = selection.append("g")
        .attr("class", "legend")
        
      legenda.append("rect")
        .attr("x", 65)
        .attr("y", 220)
        .attr("height", 10)
        .attr("width", 10)
        .attr("fill", "#7CA49E");
      legenda.append("text")
          .attr("x", 80)
          .attr("y", 230)
          .attr("height", 10)
          .attr("width", 10)
          .attr("fill", "#7CA49E")
          .attr("fill", "#888")
          .text("Incoming Calls")
          .attr("font-size", 10)
          .attr("font-family", "Open Sans, Arial, sans-serif")
          .attr("font-weight", 600);

      legenda.append("rect")
        .attr("x", 65)
        .attr("y", 245)
        .attr("height", 10)
        .attr("width", 10)
        .attr("fill", "#D35530");
      legenda.append("text")
          .attr("x", 80)
          .attr("y", 255)
          .attr("height", 10)
          .attr("width", 10)
          .attr("fill", "#D35530")
          .attr("fill", "#888")
          .text("Outgoing Calls")
          .attr("font-size", 10)
          .attr("font-family", "Open Sans, Arial, sans-serif")
          .attr("font-weight", 600)
      

    }else{

      chart = selection.select(".groupChart")
    }


    var heightBar = chartHeight/2;

    var x = d3.scale.ordinal()
      .rangeBands([0, chartWidth], .2);

    var y = d3.scale.log()
      .range([heightBar, 1])
    
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    var numberFormat = d3.format("s");
    function logFormat(d) {
      var x = Math.log(d) / Math.log(10) + 1e-6;
      return Math.abs(x - Math.floor(x)) < .4 ? numberFormat(d) : "";
    }
    function axisFormat(d) {
      var x = Math.log(d) / Math.log(10) + 1e-6;
      return Math.abs(x - Math.floor(x)) < .4 ? -chartWidth : 1;
    }
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(logFormat)

      if (originValue=="international") {
        data = data.filter(function(e){ return e.location==="international"; })
        var xDomain = d3.nest().key(function(d){return d.letterCode}).entries(data).map(function(d){ return  d.key })
        var yMax = d3.max(data, function(d){ return d.count})
        var yMin = d3.min(data, function(d){ return d.count})
        var dataOut = data.filter(function(e){ return e.type==="out"; })
        var dataIn = data.filter(function(e){ return e.type==="in"; })
      } else {
        data = data.filter(function(e){ return e.location==="national"; })
        var xDomain = d3.nest().key(function(d){return d.letterCode}).entries(data).map(function(d){ return  d.key })
        var yMax = d3.max(data, function(d){ return d.count})
        var yMin = d3.min(data, function(d){ return d.count})
        var dataOut = data.filter(function(e){ return e.type==="out"; })
        var dataIn = data.filter(function(e){ return e.type==="in"; })
      }

      x.domain(xDomain)

      if(chart.select(".x").empty()){
        chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + heightBar + ")")
          .call(xAxis);
      }else{
        chart.select(".x.axis")
          .call(xAxis)
      }

      //The In Bars
      y.domain([yMin,yMax])

      if(chart.select(".yIN").empty()){
        chart.append("g")
          .attr("class", "yIN axis")
          .call(yAxis)
      }else{
        chart.select(".yIN.axis")
          .call(yAxis)
      }

      var barsIn;
      if(chart.select(".inBars").empty()){
        barsIn = chart.append("g")
             .attr("class", "inBars")
             .selectAll(".barIn")
             .data(dataIn, function(d){return d.letterCode})
      }else{
        barsIn = chart.select(".inBars")
                   .selectAll(".barIn")
            .data(dataIn, function(d){return d.letterCode})
      }


          barsIn.transition().duration(200)
            .attr("x", function(d) { return x(d.letterCode); })
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return heightBar - y(d.count); })
            .attr("width", x.rangeBand())
          
          barsIn.enter().append("rect")
            .attr("class", "barIn")
            .attr("x", function(d) { return x(d.letterCode); })
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return heightBar - y(d.count); })
            .attr("width", x.rangeBand())
            .attr("fill", "#7CA49E")
            .attr("opacity", "1")

           barsIn.exit().remove()

      //The Out Bars
      y.domain([yMax,yMin])

       if(chart.select(".yOUT").empty()){
          chart.append("g")
            .attr("class", "yOUT axis")
            .call(yAxis);
      }else{
        chart.select(".yOUT.axis")
          .call(yAxis)
      }

      
      var barsOut;
      if(chart.select(".outBars").empty()){
        barsOut = chart.append("g")
             .attr("class", "outBars")
             .selectAll(".barOut")
             .data(dataOut, function(d){return d.letterCode})
      }else{
        barsOut = chart.select(".outBars")
                   .selectAll(".barOut")
            .data(dataOut, function(d){return d.letterCode})
      }

          barsOut.transition().duration(200)
          .attr("x", function(d) { return x(d.letterCode); })
          .attr("y", "0")
          .attr("height", function(d) { return y(d.count); })
          .attr("width", x.rangeBand())

          barsOut.enter().append("rect")
            .attr("class", "barOut")
            .attr("x", function(d) { return x(d.letterCode); })
            .attr("y", "0")
            .attr("height", function(d) { return y(d.count); })
            .attr("width", x.rangeBand())
            .attr("fill", "#D35530")
            .attr("opacity", "1")

          barsOut.exit().remove()

      barsOut.attr("transform", "translate(0,"+ (heightBar + 24) +")");

      d3.select(".yOUT").attr("transform", "translate(0,"+ (heightBar + 24) +")");

      //Styling stuff
      chart.selectAll(".axis > g > text")
        .style("fill","#888")
        .style("font-size","10px")
        .style("font-family","Open Sans, Arial, sans-serif");      
      
      chart.selectAll(".axis > .domain")
        .style("fill", "none")
        .style("stroke","#888")
        .style("stroke-width","0")
        .style("shape-rendering","crispEdges")
 

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

    vis.originValue = function(_originValue){
      if (!arguments.length) return originValue;
      originValue = _originValue;
      return vis;
    }

    //d3.rebind(vis, dispatch, 'on');

    return vis;

  }

})();