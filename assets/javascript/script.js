 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCLXyUhUnq6KT3IOsYNvWKYtnrGVXqZt08",
    authDomain: "nrfpc-fdbbd.firebaseapp.com",
    databaseURL: "https://nrfpc-fdbbd.firebaseio.com",
    projectId: "nrfpc-fdbbd",
    storageBucket: "nrfpc-fdbbd.appspot.com",
    messagingSenderId: "455767813152"
  };
  firebase.initializeApp(config);



function displayGigs() {
  console.log("The click worked");
  var artistName = $("#band-input").val().trim();
  var dateRange = moment($("#start-date-input").val().trim()).format("YYYY-MM-DD") +
    "," + moment($("#end-date-input").val().trim()).format("YYYY-MM-DD");
  console.log(artistName);
  console.log(dateRange);

  var queryURL = "https://rest.bandsintown.com/artists/" +
    artistName + "/events?app_id=codingbootcamp&date=" + dateRange
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      for (i = 0; i < response.length; i++) {
        var eventCity = $("<h3>");
        eventCity.text(response[i].venue.city + ", " + response[i].venue.region);
        var eventDate = $("<p>");
        eventDate.text(moment(response[i].datetime).format("LLLL"));
        var displayEvent = $("<button>");
        displayEvent.append(eventCity);
        displayEvent.append(eventDate);
        displayEvent.attr("data-latitude", response[i].venue.latitude);
        displayEvent.attr("data-longitude", response[i].venue.longitude);
        displayEvent.attr("data-keyword", response[i].venue.name);
        displayEvent.attr("data-city-state", response[i].venue.city + ", " + response[i].venue.region);
        displayEvent.addClass("click-venue");
        console.log(displayEvent);
        $("#search-results").append(displayEvent);
      }
    })
    // console.log(displayEvent);
}

$("#submit-search").on("click", function() {
  console.log("CLICKED");
  // event.preventDefault();
  $("#search-results").empty();
  displayGigs();
})

$(document).on("click", ".click-venue", function() {
  // var venueLat = $(this).attr("data-latitude");
  // var venueLong = $(this).attr("data-longitude");
  // var venueName = $(this).attr("data-keyword");
  // var venueCityState = $(this).attr("data-city-state")
  var venueQuery = $(this).attr("data-keyword") + " " + $(this).attr("data-city-state");
  // var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo&radius=50&location=" +
  //   venueLat + "," + venueLong + "&keyword=" + venueName;
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(response) {

  // })
  $("#embed-venue").html("<iframe width='100%' height='400px' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?q=" + 
    venueQuery + "&key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo' allowfullscreen></iframe>");
  $("#nearby-button").html("<button class='btn btn-secondary btn-lg' data-venue='" + venueQuery + 
    "' data-toggle='modal' data-target='#hotels-modal' id='nearby-hotels-button'>Show me nearby hotels!</button><br><button class='btn btn-secondary btn-lg' data-venue='" + venueQuery + 
    "' data-toggle='modal' data-target='#bars-modal' id='nearby-bars-button'>Show me nearby bars!</button>");
});

$(document).on("click", "#nearby-hotels-button", function() {
  var searchReference = $(this).attr("data-venue");
  $("#hotels-map").html("<iframe width='100%' height='400px' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=hotels+near+" + 
  searchReference + "&key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo' allowfullscreen></iframe>");
});

$(document).on("click", "#nearby-bars-button", function() {
  var searchReference = $(this).attr("data-venue");
  $("#bars-map").html("<iframe width='100%' height='400px' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=bars+near+" + 
  searchReference + "&key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo' allowfullscreen></iframe>");
});
