$(document).ready(function() {
  let directionsURL =
    "https://api.mapbox.com/directions/v5/mapbox/driving/-77%2C39%3B-77%2C38.895.json?";
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFnaWFtYTkiLCJhIjoiY2s1ZTQ5eTd0MDBmMjNsbm00dTQ4cWcydCJ9.Fsow7km2bw_bHw0r7jtPlw";
  let directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  $.ajax({
    url: directionsURL,
    method: "GET",
    data: {
      access_token:
        "pk.eyJ1IjoibWFnaWFtYTkiLCJhIjoiY2s1ZTQ5eTd0MDBmMjNsbm00dTQ4cWcydCJ9.Fsow7km2bw_bHw0r7jtPlw"
    },
    success: function(response) {
      console.log(response);
    },
    error: function() {
      console.log("ERROR");
    }
  });

  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [-77.1, 38.9], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });

  map.on("load", function() {
    map.addControl(directions, "top-left");
    origin();
  });

  function origin() {
    return directions.getOrigin();
  }
});
