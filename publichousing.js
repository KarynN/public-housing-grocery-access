
/*
var map = new L.Map("map")
.setView(new L.LatLng(40.758700379161006, -73.95652770996094), 12)

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 17,
  minZoom: 4
}).addTo(map);

//L.svg().addTo(map);
*/


var storymap = new L.Map("storymap",  { scrollWheelZoom: false })
.setView(new L.LatLng(40.738700379161006, -73.77652770996094), 11)

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
}).addTo(storymap);

//L.svg().addTo(storymap);

tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "1000")
.style("visibility", "hidden")
.style("opacity","1")
.style("padding","5px")
.style("font-family", "'Rubik', sans-serif")
.style("font-size", "12px")
.style("color", "black")
.style("max-width", "200px")

var controller = new ScrollMagic.Controller();

d3.csv("data/grocery-2020.csv")
.then(function(data) {
  var grocery = new Array();
  new ScrollMagic.Scene({triggerElement: "#div2"})
  .on("enter", function (event) { 
    for (i = 0; i < data.length; i++) {
    var grocerymarker = new L.circle([data[i].Latitude, data[i].Longitude], {
      fillColor: "pink",
      fillOpacity: 0.4,  
      radius: 90,
      weight: 1,
      color: "pink"
    })
    grocery.push(grocerymarker);
    storymap.addLayer(grocery[i]);}
    })
  .on("leave", function (event) { 
    for(i=0;i<grocery.length;i++) {
        storymap.removeLayer(grocery[i]);}  
      })
  .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div7"})
  .on("enter", function (event) { 
    for(i=0;i<grocery.length;i++) {
      storymap.removeLayer(grocery[i]);}  
    })
  .on("leave", function (event) { 
    for(i=0;i<grocery.length;i++) {
      storymap.addLayer(grocery[i]);}  
  }).addTo(controller);


  new ScrollMagic.Scene({triggerElement: "#div10"})
  .on("enter", function (event) { 
    for(i=0;i<grocery.length;i++) {
      storymap.addLayer(grocery[i]);}  
      storymap.setView([40.738700379161006, -73.77652770996094], 11) 
  })
  .on("leave", function (event) { 
    for(i=0;i<grocery.length;i++) {
      storymap.removeLayer(grocery[i]);}  
      storymap.setView([40.650958, -73.878416], 14) 
  }).addTo(controller);


})





d3.json("data/lower_east.geojson")
.then(function(data) {

  var lowereastgeojson = data.features
  var lowereastlayer = new Array();

  new ScrollMagic.Scene({triggerElement: "#div5"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {
        var lowereastiso = L.geoJSON(lowereastgeojson[i], {
          color: "royalblue",
          opacity: 0.6,
          weight: 0.4,
          fillOpacity: 0.1,
          fillColor: "royalblue",
          zIndex: 100
        })
      lowereastlayer.push(lowereastiso);
      storymap.addLayer(lowereastlayer[i]);}
      })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(lowereastlayer[i])}
    }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div6"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(lowereastlayer[i])}
    })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.addLayer(lowereastlayer[i])}
    }).addTo(controller);
})

d3.json("data/berry.geojson")
.then(function(data) {

  var berrygeojson = data.features
  var berrylayer = new Array();

  new ScrollMagic.Scene({triggerElement: "#div6"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {
        var berryiso = L.geoJSON(berrygeojson[i], {
          color: "royalblue",
          opacity: 0.6,
          weight: 0.4,
          fillOpacity: 0.1,
          fillColor: "royalblue",
          zIndex: 100
        })
      berrylayer.push(berryiso);
      storymap.addLayer(berrylayer[i]);}
      })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(berrylayer[i])}
    }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div7"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(berrylayer[i])}
    })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.addLayer(berrylayer[i])}
    }).addTo(controller);
})

d3.json("data/largest.geojson")
.then(function(data) {
  var largestgeojson = data.features[0]
  var largestlayer = L.geoJSON(largestgeojson, {
    color: "palevioletred",
    weight: 2,
    fillOpacity: 0.3,
    fillColor: "palevioletred"
  })
  new ScrollMagic.Scene({triggerElement: "#div9"})
    .on("enter", function (event) { 
    storymap.addLayer(largestlayer)})
    .on("leave", function (event) { 
      storymap.removeLayer(largestlayer)
    }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div10"})
    .on("enter", function (event) { 
    storymap.removeLayer(largestlayer)})
    .on("leave", function (event) { 
    storymap.addLayer(largestlayer)
    }).addTo(controller);
})

d3.json("data/breukelen.geojson")
.then(function(data) {

  var breukelengeojson = data.features
  var breukelenlayer = new Array();

  new ScrollMagic.Scene({triggerElement: "#div9"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {
        var breukeleniso = L.geoJSON(breukelengeojson[i], {
          color: "royalblue",
          opacity: 0.6,
          weight: 0.4,
          fillOpacity: 0.1,
          fillColor: "royalblue",
          zIndex: 100
        })
      breukelenlayer.push(breukeleniso);
      storymap.addLayer(breukelenlayer[i]);}
      })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(breukelenlayer[i])}
    }).addTo(controller);

new ScrollMagic.Scene({triggerElement: "#div10"})
    .on("enter", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(breukelenlayer[i])}
    })
    .on("leave", function (event) { 
    for (i = 0; i < 3; i++) {storymap.addLayer(breukelenlayer[i])}
    }).addTo(controller);
})



d3.csv("data/nycha_percentiles_joined_2.csv")
.then(function(data) {
  var housing = new Array();
  new ScrollMagic.Scene({triggerElement: "#div3"})
  .on("enter", function (event) { 
    for (i = 0; i < data.length; i++) {
    var housingmarker = new L.circle([data[i].Latitude, data[i].Longitude], {
      fillColor: "violet",
      fillOpacity: 1,  
      radius: 200,
      weight: 1,
      color: "red",
      zIndex: 500
    })
    housing.push(housingmarker);
    storymap.addLayer(housing[i]);}
    })
  .on("leave", function (event) { 
    for(i=0;i<housing.length;i++) {
        storymap.removeLayer(housing[i]);}  
      })   
  .addTo(controller);

  var accessiblemarker = new L.circle([40.721313, -73.990438], {
    fillColor: "yellow",
    fillOpacity: 1,  
    radius: 150,
    weight: 1,
    color: "orange",
    zIndex: 500
  })

  var inaccessiblemarker = new L.circle([40.587176, -74.101989], {
    fillColor: "yellow",
    fillOpacity: 1,  
    radius: 150,
    weight: 1,
    color: "orange",
    zIndex: 500
  })

  new ScrollMagic.Scene({triggerElement: "#div5"})
  .on("enter", function (event) { 
    storymap.setView([40.721313, -73.990438], 14)
    for(i=0;i<housing.length;i++) {storymap.removeLayer(housing[i]);}  
    storymap.addLayer(accessiblemarker)
  })

  .on("leave", function (event) { 
    storymap.setView([40.758700379161006, -73.75652770996094], 11)
    for(i=0;i<housing.length;i++) {storymap.addLayer(housing[i])}
    storymap.removeLayer(accessiblemarker)
  }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div6"})
  .on("enter", function (event) { 
    storymap.setView([40.587176, -74.101989], 14) 
    storymap.removeLayer(accessiblemarker)
    storymap.addLayer(inaccessiblemarker)
  })
  .on("leave", function (event) { 
    storymap.setView([40.721313, -73.990438], 14)
    storymap.removeLayer(inaccessiblemarker)
    storymap.addLayer(accessiblemarker)
  }).addTo(controller);

  var count = new Array();
  new ScrollMagic.Scene({triggerElement: "#div7"})
  .on("enter", function (event) { 
    storymap.setView([40.738700379161006, -73.77652770996094], 11) 
    storymap.removeLayer(inaccessiblemarker)
  })
  .on("leave", function (event) { 
    storymap.setView([40.587176, -74.101989], 14) 
    storymap.addLayer(inaccessiblemarker)
  }).addTo(controller);


  var count = new Array();
  var time = new Array();
  new ScrollMagic.Scene({triggerElement: "#div8"})
  .on("enter", function (event) { 
    storymap.setView([40.758700379161006, -73.85652770996094], 12)

    colorcount = ""
    for (i = 0; i < data.length; i++) {
    if (data[i].count_score <= 0.33 ) {
      colorcount = "#BAF2E9";}
    if (data[i].count_score >0.33 && data[i].count_score <= 0.66) {
      colorcount =  "#5AB1BB";}
    if (data[i].count_score > 0.66 ) {
      colorcount = "#028295";}
  
    var countmarker = L.circle([data[i].Latitude, data[i].Longitude], {
        fillColor: colorcount,
        fillOpacity: 1,  
        radius: 200,
        weight: 1,
        color: "white",
      }).bindPopup("<span style = 'font-family: Rubik; line-height: 1.7em' ><span style = 'font-size: 10px; line-height: 2em; font-weight: 900;'>"+ data[i].developmen +  ", " + data[i].borough + "</span><br><span style = 'font-size: 16px;'>" + data[i].under_ten + " grocery stores</span><br>can be reached in a 10 minute walk<br><span style = 'line-height: 2em;'>Percentile: " + Math.round(data[i].count_score * 100) + "</span></span>")
      count.push(countmarker);
      storymap.addLayer(count[i]);
    }

    colortime = ""
    for (i = 0; i < data.length; i++) {
    if (data[i].time_score_2 <= 0.33 ) {
      colortime = "plum";}
    if (data[i].time_score_2 >0.33 && data[i].time_score_2 <= 0.66) {
      colortime =  "mediumorchid";}
    if (data[i].time_score_2 > 0.66 ) {
      colortime = "purple";}

    totaltime = parseFloat(data[i].under_ten) + parseFloat(data[i].ten_twenty) + parseFloat(data[i].twenty_thirty)
    var timemarker = L.circle([data[i].Latitude, data[i].Longitude], {
        fillColor: colortime,
        fillOpacity: 1,  
        radius: 200,
        weight: 1,
        color: "white",
      }).bindPopup("<span style = 'font-family: Rubik; line-height: 1.7em' ><span style = 'font-size: 10px; line-height: 2em; font-weight: 900;'>"+ data[i].developmen +  ", " + data[i].borough + "</span><br><span style = 'font-size: 16px;'>" + totaltime + " grocery stores</span><br>can be reached in a 30 minute walk<span style = 'line-height: 1em;'><br>Score: " + Math.round(data[i].time_score_2 * 100) + "</span></span>")
      time.push(timemarker);
    }

    d3.select("#countbutton").on("click", function() { 
      d3.select(this).attr("class", "buttonactive")
      d3.select("#timebutton").attr("class", "button")
      for (i = 0; i < data.length; i++) {
        storymap.removeLayer(time[i])
        storymap.addLayer(count[i])}
    })
    d3.select("#timebutton").on("click", function() { 
      d3.select(this).attr("class", "buttonactive")
      d3.select("#countbutton").attr("class", "button")
      for (i = 0; i < data.length; i++) {
        storymap.addLayer(time[i])
        storymap.removeLayer(count[i])}
    })

  })
  .on("leave", function (event) { 
    for(i=0;i<count.length;i++) {
      storymap.removeLayer(count[i])
      storymap.removeLayer(time[i])}
    storymap.setView([40.758700379161006, -73.75652770996094], 11) 
    d3.select("#timebutton").attr("class", "button")
    d3.select("#countbutton").attr("class", "buttonactive")
  }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div9"})
  .on("enter", function (event) { 
    storymap.setView([40.650958, -73.878416], 14) 
    for(i=0;i<count.length;i++) {
      storymap.removeLayer(count[i])
      storymap.removeLayer(time[i])}
    d3.select("#timebutton").attr("class", "button")
    d3.select("#countbutton").attr("class", "buttonactive")
  })
  .on("leave", function (event) { 
    for(i=0;i<count.length;i++) {storymap.addLayer(count[i])}
    storymap.setView([40.758700379161006, -73.85652770996094], 12)
  }).addTo(controller);


//HISTORGRAM

var graphsvgheight = window.innerHeight*0.6
var graphsvgwidth =  window.innderWidth*0.54

var svg = d3.select("#graph")
  .append("svg")
    .attr("width", graphsvgwidth)
    .attr("height", graphsvgheight)
  .append("g")
    .attr("transform","translate(" + 70 + "," + 100 + ")");


var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.under_ten })]) 
    .range([0, 450])
svg.append("g")
      .attr("transform", "translate("+0+"," + 280 + ")")
    //  .call(d3.axisBottom(x).ticks(20).tickSize(0))
      .attr("id", "xaxis")
      .selectAll("text")
      .attr("y", 6)
      .attr("x", 2.5)
      .style("text-anchor", "start");
svg.append("g")
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", 470)
      .attr("y", 315)
      .text("Number of Grocery Stores")
      .style("font-size", "12px")

  var y = d3.scaleLinear()
      .range([280, 0]);
 //     y.domain([0, d3.max(binsten, function(d) { return d.length; })]);  
  svg.append("g")
      .attr("id", "yaxis")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .attr("x", -6)
      .style("text-anchor", "end");;
  svg.append("g")
      .append("text")
      .attr("text-anchor", "start")
      .attr("x", -30)
      .attr("y", -17)
      .text("Frequency")
      .style("font-size", "12px")
  svg.append("g")
      .append("text")
      .attr("text-anchor", "start")
      .attr("x", -30)
      .attr("y", -40)
      .text("Frequency of Grocery Store Counts")
      .style("font-size", "16px")

x.domain([0, d3.max(data, function(d) { return +parseFloat(d.under_ten) + parseFloat(d.ten_twenty) + parseFloat(d.twenty_thirty) })])    
svg.select("#xaxis").call(d3.axisBottom(x).ticks(20).tickSize(0))
var histogram2 = d3.histogram()
.value(function(d) { return parseFloat(d.under_ten) + parseFloat(d.ten_twenty) + parseFloat(d.twenty_thirty); })  
.domain(x.domain())  
.thresholds(x.ticks(60)); 
var binsthirty = histogram2(data);
y.domain([0, d3.max(binsthirty, function(d) { return d.length; })])
svg.select("#yaxis").call(d3.axisLeft(y).tickSize(0))


  svg.selectAll("rect-thirty")
    .data(binsthirty)
    .enter()
      .append("rect")
        .attr("x", 1)
        .attr("id", "thirtygraph")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return 280 - y(d.length); })
        .style("fill", "olivedrab")
        .attr("visibility", "hidden")

 
  x.domain([0, d3.max(data, function(d) { return +d.under_ten })])    
  svg.select("#xaxis").call(d3.axisBottom(x).ticks(20).tickSize(0))
  var histogram = d3.histogram()
  .value(function(d) { return d.under_ten; })  
  .domain(x.domain())  
  .thresholds(x.ticks(60)); 
  var binsten = histogram(data);
  y.domain([0, d3.max(binsten, function(d) { return d.length; })])
  svg.select("#yaxis").call(d3.axisLeft(y).tickSize(0))

  svg.selectAll("rect-ten")
    .data(binsten)
    .enter()
      .append("rect")
        .attr("x", 1)
        .attr("id", "tengraph")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return 280 - y(d.length); })
        .style("fill", "indianred")
        .attr("visibility", "visible")



  d3.select("#tenbutton").on("click", function() { 
    d3.select(this).attr("class", "buttonactive")
    d3.select("#thirtybutton").attr("class", "button")

    x.domain([0, d3.max(data, function(d) { return +d.under_ten })])    
    svg.select("#xaxis").call(d3.axisBottom(x).ticks(20).tickSize(0))
    y.domain([0, d3.max(binsten, function(d) { return d.length; })])
    svg.select("#yaxis").call(d3.axisLeft(y).tickSize(0))
    svg.selectAll("#tengraph").attr("visibility", "visible")
    svg.selectAll("#thirtygraph").attr("visibility", "hidden")

  })
  d3.select("#thirtybutton").on("click", function() { 
    d3.select(this).attr("class", "buttonactive")
    d3.select("#tenbutton").attr("class", "button")
  
    x.domain([0, d3.max(data, function(d) { return +parseFloat(d.under_ten)+parseFloat(d.ten_twenty)+parseFloat(d.twenty_thirty) })])
    svg.select("#xaxis").call(d3.axisBottom(x).ticks(10).tickSize(0))
    y.domain([0, d3.max(binsthirty, function(d) { return d.length; })])
    svg.select("#yaxis").call(d3.axisLeft(y).tickSize(0))
    svg.selectAll("#tengraph").attr("visibility", "hidden")
    svg.selectAll("#thirtygraph").attr("visibility", "visible")

  })
  




})


d3.json("data/30min-iso-all-dissolved.geojson")
.then(function(data) {

  var alliso = data.features[0]
  var allisolayer = L.geoJSON(alliso, {
    color: "royalblue",
    opacity: 0.6,
    weight: 0.6,
    fillOpacity: 0.1,
    fillColor: "royalblue"
  })

  new ScrollMagic.Scene({triggerElement: "#div4"})
    .on("enter", function (event) { 
    storymap.addLayer(allisolayer)})
    .on("leave", function (event) { 
      storymap.removeLayer(allisolayer)
    }).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#div5"})
    .on("enter", function (event) { 
    storymap.removeLayer(allisolayer)})
    .on("leave", function (event) { 
      storymap.addLayer(allisolayer)
    }).addTo(controller);

})



d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "visible")
d3.select("#map").style("visibility", "hidden")

d3.select("#methodbutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "visible")
d3.selectAll("#storymap, #storytext, #centerdiv, #graph").style("visibility", "hidden").style("display", "none")
d3.select("#storybutton").attr("class", "inactive")
})

d3.select("#storybutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "hidden")
d3.selectAll("#storymap, #storytext, #centerdiv, #graph").style("visibility", "visible").style("display", "block")
d3.select("#methodbutton").attr("class", "inactive")
})

