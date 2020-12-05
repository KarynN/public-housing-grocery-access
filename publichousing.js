

var map = new L.Map("map")
.setView(new L.LatLng(40.758700379161006, -73.95652770996094), 12)

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  maxZoom: 17,
  minZoom: 4
}).addTo(map);

//L.svg().addTo(map);


var storymap = new L.Map("storymap",  { scrollWheelZoom: false })
.setView(new L.LatLng(40.758700379161006, -73.75652770996094), 11)

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
{attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
maxZoom: 11,
minZoom: 11
}).addTo(storymap);

//L.svg().addTo(storymap);


var controller = new ScrollMagic.Controller();

d3.csv("data/nycha-scores-joined.csv")
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
})

d3.csv("data/grocery-2020.csv")
.then(function(data) {
  var grocery = new Array();
  new ScrollMagic.Scene({triggerElement: "#div2"})
  .on("enter", function (event) { 
    for (i = 0; i < data.length; i++) {
    var grocerymarker = new L.circle([data[i].Latitude, data[i].Longitude], {
      fillColor: "pink",
      fillOpacity: 0.4,  
      radius: 100,
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
})


d3.csv("data/nycha-scores-joined.csv")
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
})



d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "visible")
d3.select("#map").style("visibility", "hidden")

d3.select("#mapbutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "visible")
d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "hidden")
d3.select("#storybutton").attr("class", "inactive")
})

d3.select("#storybutton").on("click", function() { 
d3.select(this).attr("class", "active")
d3.select("#map").style("visibility", "hidden")
d3.selectAll("#storymap, #storytext, #centerdiv").style("visibility", "visible")
d3.select("#mapbutton").attr("class", "inactive")
})