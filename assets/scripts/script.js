$(document).ready(function() {
  let directionsURL = "https://api.mapbox.com/directions/v5/mapbox/driving/-77%2C39%3B-77%2C38.895.json?";

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
});
