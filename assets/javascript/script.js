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
        var displayEvent = $("<div>");
        displayEvent.append(eventCity);
        displayEvent.append(eventDate);
        displayEvent.attr("data-latitude", response[i].venue.latitude);
        displayEvent.attr("data-longitude", response[i].venue.longitude);
        displayEvent.attr("data-keyword", response[i].venue.name);
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
  displayGigs();
})
// $(".click-venue").on("click", function() {
//   var venueLat = this.attr("data-latitude");
//   var venueLong = this.attr("data-longitude");
//   var venueName = this.attr("data-keyword");
//   var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo&radius=50&location=" +
//     venueLat + "," + venueLong + "&keyword=" + venueName;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

//   })
// })