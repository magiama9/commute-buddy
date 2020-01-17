/* GLOBAL VARIABLES */
/******************** */

let routeCost;
let runningCosts;
let runningCostWeekly;
let runningCostMonthly;
let runningCostYearly;
let routeCostWeekly;
let routeCostMonthly;
let routeCostYearly;
let originLat;
let originLon;
let destinationLat;
let destinationLon;
let routeDistance;
let walkingDistance;
let cyclingDistance;
let routeDistanceMiles;
let totalDistance;
let mpg = 25;
let travelPerWeek = 5;
let gasPrice = 2.571;
let cyclePerWeek = 0;
let walkPerWeek = 0;

/********************* */

$(document).ready(function() {
  let directionsURL =
    "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/";
  let walkingURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
  let cyclingURL = "https://api.mapbox.com/directions/v5/mapbox/cycling/";
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFnaWFtYTkiLCJhIjoiY2s1ZTQ5eTd0MDBmMjNsbm00dTQ4cWcydCJ9.Fsow7km2bw_bHw0r7jtPlw";
  let directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  // FUEL COST IS HARD CODED CURRENTLY FOR DEVELOPMENT. ACTIVATE FUEL API CALL FOR PRODUCTION
  // fuelAPICall();

  // CREATES A NEW MAPBOX MAP OBJECT AND ADDS IT TO THE GIVEN CONTAINER
  let map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [-77.1, 38.9], // starting position [lng, lat]
    zoom: 13 // starting zoom
  });
  // HANDLES EVENTS FOR WHEN THE MAP FINISHES LOADING AND ADDS CONTROLS TO THE MAP USING MAPBOX DIRECTIONS GL PLUGIN
  map.on("load", function() {
    map.addControl(directions, "top-left");

    // ADDS A CLICK HANDLER ON THE BUTTON ONCE THE MAP LOADS
    $("#calcButton").on("click", function() {
      let routeOrigin = directions.getOrigin();
      let routeDestination = directions.getDestination();
      originLon = routeOrigin.geometry.coordinates[0];
      originLat = routeOrigin.geometry.coordinates[1];
      destinationLon = routeDestination.geometry.coordinates[0];
      destinationLat = routeDestination.geometry.coordinates[1];

      getMPG();
      timesPerWeek();
      getDistance();
      getWalkingDistance();
      getCyclingDistance();
    });
  });

  // CALLS MAPBOX DIRECTIONS API AND FETCHES THE ROUTE OBJECT OF THE USER INPUTTED ROUTE
  function getDistance() {
    $.ajax({
      url:
        directionsURL +
        originLon +
        "%2C" +
        originLat +
        "%3B" +
        destinationLon +
        "%2C" +
        destinationLat +
        ".json?",
      method: "GET",
      data: {
        access_token: mapboxgl.accessToken
      },
      success: function(response) {
        console.log(response);

        // ROUTE DISTANCE IS RETURNED IN METERS
        routeDistance = response.routes[0].distance;
        routeDistanceMiles = parseFloat(metersToMiles(routeDistance));
        fuelCalc();
        runningCostCalc();
        multiplyCost();
      },
      error: function() {
        console.log("ERROR");
      }
    });
  }
  function getWalkingDistance() {
    $.ajax({
      url:
        walkingURL +
        originLon +
        "%2C" +
        originLat +
        "%3B" +
        destinationLon +
        "%2C" +
        destinationLat +
        ".json?",
      method: "GET",
      data: {
        access_token: mapboxgl.accessToken
      },
      success: function(response) {
        // ROUTE DISTANCE IS RETURNED IN METERS
        walkingDistance = metersToMiles(response.routes[0].distance);

        walkingCal();
      },
      error: function() {
        console.log("ERROR");
      }
    });
  }

  function getCyclingDistance() {
    $.ajax({
      url:
        cyclingURL +
        originLon +
        "%2C" +
        originLat +
        "%3B" +
        destinationLon +
        "%2C" +
        destinationLat +
        ".json?",
      method: "GET",
      data: {
        access_token: mapboxgl.accessToken
      },
      success: function(response) {
        console.log(response);

        // ROUTE DISTANCE IS RETURNED IN METERS
        cyclingDistance = metersToMiles(response.routes[0].distance);

        cyclingCal();
      },
      error: function() {
        console.log("ERROR");
      }
    });
  }

  // FETCHES GAS PRICES FROM API AND CALCULATES COST BASED ON THAT DISTANCE
  // THIS FUNCTION IS CALLED WHEN THE PAGE LOADS
  // N.B. LIMITED TO 100 CALLS/MO/KEY. CURRENTLY GAS PRICE IS HARD-CODED FOR DEVELOPMENT AND TESTING.
  function fuelAPICall() {
    $.ajax({
      url: "https://api.collectapi.com/gasPrice/stateUsaPrice?state=",
      headers: {
        Authorization: "apikey 485bJxbUzdJubTSHMODQfc:11QIJl8kdAW5Y6uvyrUIQJ",
        method: "GET",
        data: {}
      }
    }).then(function(response) {
      gasPrice = response.result.state.gasoline;
    });
  }
  // CONVERTS A VALUE IN METERS TO THE EQUIVALENT VALUE IN MILES WITH TWO DECIMAL POINTS
  // N.B. THE VALUE RETURNED IS A __STRING__
  function metersToMiles(num) {
    return (num / 1609.34).toFixed(2);
  }

  // IF THE USER HITS ENTER ON THE INPUT FIELD, IT GETS THE MPG AND CALCULATES COST
  $("#mpgInput").on("keydown", function(e) {
    if (e.which === 13) {
      getMPG();
      getDistance();
    }
  });

  // IF USER INPUTS AN MPG VALUE, USE THAT VALUE AS MPG
  // OTHERWISE MPG DEFAULTS TO 25 MPG(NATIONAL AVERAGE)
  function getMPG() {
    if ($("#mpgInput").val()) {
      mpg = $("#mpgInput").val();
      console.log("test test test");
    } else {
      mpg = 25;
    }
  }

  // CALCULATES MULTIPLES OF ROUTE COST FOR WEEKLY/MONTHLY/YEARLY COSTS
  function multiplyCost() {
    // CALCULATES RUNNING COST TO BE USED IN CALCULATIONS BELOW

    // CONVERTS ROUTE COST TO A NUMBER SO MATH CAN BE PERFORMED
    // PARSEFLOAT() KEEPS DECIMALS WHEN CONVERTING A STRING TO A NUMBER

    let costNum = parseFloat(routeCost);
    let runningCostNum = parseFloat(runningCosts);

    // 5 DAYS/ WK
    routeCostWeekly = (costNum * parseFloat(travelPerWeek)).toFixed(0);
    runningCostWeekly = (runningCostNum * parseFloat(travelPerWeek)).toFixed(0);
    $("#costWeek").text("This commute will cost you $" + routeCostWeekly+" per week.")
    // 21 WORKING DAYS/MO ON AVERAGE, 4.357 WEEKS/MO ON AVERAGE
    routeCostMonthly = (parseFloat(routeCostWeekly) * 4.357).toFixed(0);
    $("#costMonth").text("This commute will cost you $" + routeCostMonthly+" per month.")
    runningCostMonthly = (parseFloat(runningCostWeekly) * 4.357).toFixed(0);
    // 261 WORKING DAYS PER YEAR ON AVERAGE, 12 Months a year, plus 9 additional days
    routeCostYearly = (parseFloat(routeCostMonthly) * 12).toFixed(0);
    $("#costYear").text("This commute will cost you $" + routeCostYearly + " per year.")
    runningCostYearly = (parseFloat(runningCostMonthly) * 12).toFixed(0);
    console.log("All in, this will cost you " + runningCostYearly);
  }

  $("#commuterOptions").on("keydown", function(e) {
    if (e.which === 13) {c
      getMPG();
      timesPerWeek();
      getDistance();
    }
  });

  // FUNCTION TO SHOW MPG COST ONCE COMMUTE IS CLICKED
  $("#switchExample").on("click", function() {
    if ($("#switchExample").is(":checked")) {
      $(".boxChecked").show();
    } else {
      $(".boxChecked").hide();
    }
  });

  // Handles fetching user input for how often they travel the route

  function timesPerWeek() {
    if ($("#commuterOptions").val()) {
      travelPerWeek = $("#commuterOptions").val();
    }
  }

  // CALORIES BURNED WALKING
  function walkingCal() {
    if ($("#female").is(":checked")) {
      // WOMEN
      var womenWalk = Math.floor(((170 * 2) / 3.5) * walkingDistance);
      console.log("You will burn " + womenWalk + " calories by walking.");
      poundsPerYear(womenWalk);
    }
    if ($("#male").is(":checked")) {
      // MEN
      var menWalk = Math.floor(((200 * 2) / 3.5) * walkingDistance);
      console.log("You will burn " + menWalk + " calories by walking.");

      poundsPerYear(menWalk);
    }
    if ($("#non-binary").is(":checked")) {
      // NON-BINARY/PREFER NOT TO SPECIFY

      var nonBinaryWalk = Math.floor(((185 * 2) / 3.5) * walkingDistance);
      console.log("You will burn " + nonBinaryWalk + " calories by walking.");
      poundsPerYear(nonBinaryWalk);
    } else {
      console.log("No conditions were met.");
    }
  }

  // CALORIES BURNED CYCLING
  function cyclingCal() {
    if ($("#female").is(":checked")) {
      // WOMEN
      var womenCycle = Math.floor(((170 * 1.9) / 12) * cyclingDistance);
      console.log("You will burn " + womenCycle + " calories by cycling.");
      poundsPerYear(womenCycle);
    } else if ($("#male").is(":checked")) {
      // MEN
      var menCycle = Math.floor(((200 * 1.9) / 12) * cyclingDistance);
      console.log("You will burn " + menCycle + " calories by cycling.");
      poundsPerYear(menCycle);
    } else if ($("#non-binary").is(":checked")) {
      // NON-BINARY/PREFER NOT TO SPECIFY
      var nonBinaryCycle = Math.floor(((185 * 1.9) / 12) * cyclingDistance);
      console.log("You will burn " + nonBinaryCycle + " calories by cycling.");
      poundsPerYear(nonBinaryCycle);
    } else {
      console.log("No conditions were met.");
    }
  }

  function poundsPerYear(num) {
    var weeklyCal =
      num *
      (parseInt(travelPerWeek) +
        parseInt(cyclePerWeek) +
        parseInt(walkPerWeek));
    var monthlyCal = weeklyCal * 4.357;
    var yearlyCal = monthlyCal * 12;
    var yearlyPounds = yearlyCal / 3500;
    console.log(
      "You will burn " + Math.floor(yearlyPounds) + " pounds per year."
    );
  }

  function fuelCalc() {
    totalDistance = parseFloat(routeDistanceMiles);
    routeCost = ((totalDistance / mpg) * gasPrice).toFixed(2);
    $("#costTrip").text("Your trip will cost $"+routeCost+".")
  }

  function runningCostCalc() {
    runningCosts = parseFloat(routeDistanceMiles) * 0.58;
    console.log("running costs are " + runningCosts);
  }

  // function addPoppers() {
  //   import { createPopper } from "@popperjs/core";
  //   const popcorn = document.querySelector("#popcorn");
  //   const tooltip = document.querySelector("#tooltip");
  //   createPopper(popcorn, tooltip, {
  //     placement: "left-start"
  //   });
  // }
});
