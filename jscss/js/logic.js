// URL - 4.5+ Earthquakes
var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

// Perform a GET request to the query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.title +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  function getColor(d){
    if (d<3){
      return "#fbefcc";
             }
    else if (d<3.5) {
      return "#f9ccac";
             }
    else if (d<4) {
      return "#f4a698"
              }
    else if (d<4.5) {
      return "#e0876a"
              }
    else if (d<5) {
      return "#e06377";
              }
    else if (d<5.5) {
      return "#c83349"
              }
    else if (d<6) {
      return "#622569"
              }
    else {
      return "#4f3222"
    }
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData,{onEachFeature: onEachFeature,
  pointToLayer: function(feature, point ) {
    return L.circleMarker(point, {
      radius: (feature.properties.mag)*5,
      fillColor: getColor(feature.properties.mag),
      color:"white",
      weight: 1,
      opacity:1,
      fillOpacity: 0.6
    });
  }
});


  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes){

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var baseMaps = {
    "Light Map": lightmap
  };

  var overlayMaps = {
    "Earthquakes Map": earthquakes
  };

  // Map Object
  var myMap = L.map("map-id", {
    center: [37.77, -122.43],
    zoom: 7,
    layers: [lightmap, earthquakes]
  });


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
