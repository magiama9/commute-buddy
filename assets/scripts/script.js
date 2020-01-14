$.ajax({
  url: uvURL,
  method: "GET",
  data: {
    lat: currentLat,
    lon: currentLon,
    APPID: "968b7fae60d97ecc132a2221d027b935"
  },
  success: function(response) {
    currentUV = response.value;
    console.log(currentUV);
    displayUV();
  },
  error: function() {
    console.log("ERROR UV");
  }
});