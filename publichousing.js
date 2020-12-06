
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
.setView(new L.LatLng(40.758700379161006, -73.75652770996094), 11)

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
}).addTo(storymap);

//L.svg().addTo(storymap);


var controller = new ScrollMagic.Controller();


/*
d3.csv("data/nycha_percentiles_joined.csv")
.then(function(data) {

var points = []
data.forEach(function(d) {
points.push({
  Lat: d.Latitude,
  Long: d.Longitude,
  score: d.scores_SCORE,
  population: d.NYCHA_data_TOTALPOPULATION,
  development: d.developmen
});
});

color = ""
for (i = 0; i < points.length; i++) {
if (points[i].score <0.33 ) {
	color = "#028295";}
if (points[i].score >0.33 && points[i].score < 0.66) {
	color =  "#5AB1BB";}
if (points[i].score > 0.66 ) {
	color = "#BAF2E9";}
var circle = L.circle([points[i].Lat, points[i].Long], {
	fillColor: color,
	fillOpacity: 1,  
	radius: 200,
	weight: 1,
	color: "white",
}).bindPopup(points[i].development + "<br>Score: " + Math.round(points[i].score * 100) / 100).addTo(map)
}
})*/

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



})


d3.csv("data/nycha_percentiles_joined.csv")
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
    storymap.setView([40.758700379161006, -73.75652770996094], 11) 
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
      colorcount = "#028295";}
    if (data[i].count_score >0.33 && data[i].count_score <= 0.66) {
      colorcount =  "#5AB1BB";}
    if (data[i].count_score > 0.66 ) {
      colorcount = "#BAF2E9";}
  
    var countmarker = L.circle([data[i].Latitude, data[i].Longitude], {
        fillColor: colorcount,
        fillOpacity: 1,  
        radius: 200,
        weight: 1,
        color: "white",
      }).bindPopup(data[i].developmen + "<br>Score: " + Math.round(data[i].count_score * 100) / 100)
      count.push(countmarker);
      storymap.addLayer(count[i]);
    }

    colortime = ""
    for (i = 0; i < data.length; i++) {
    if (data[i].time_score <= 0.33 ) {
      colortime = "lavender";}
    if (data[i].time_score >0.33 && data[i].time_score <= 0.66) {
      colortime =  "purple";}
    if (data[i].time_score > 0.66 ) {
      colortime = "violet";}

    var timemarker = L.circle([data[i].Latitude, data[i].Longitude], {
        fillColor: colortime,
        fillOpacity: 1,  
        radius: 200,
        weight: 1,
        color: "white",
      }).bindPopup(data[i].developmen + "<br>Score: " + Math.round(data[i].count_score * 100) / 100)
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
          zIndex: 200
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
          zIndex: 200
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
    color: "green",
    weight: 2,
    fillOpacity: 0.4,
    fillColor: "green"
  })
  new ScrollMagic.Scene({triggerElement: "#div9"})
    .on("enter", function (event) { 
    storymap.addLayer(largestlayer)})
    .on("leave", function (event) { 
      storymap.removeLayer(largestlayer)
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
          zIndex: 200
        })
      breukelenlayer.push(breukeleniso);
      storymap.addLayer(breukelenlayer[i]);}
      })
    .on("leave", function (event) { 
      for (i = 0; i < 3; i++) {storymap.removeLayer(breukelenlayer[i])}
    }).addTo(controller);
})


d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "visible")
d3.select("#map").style("visibility", "hidden")

d3.select("#methodbutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "visible")
d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "hidden")
d3.select("#storybutton").attr("class", "inactive")
})

d3.select("#storybutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "hidden")
d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "visible")
d3.select("#methodbutton").attr("class", "inactive")
})

