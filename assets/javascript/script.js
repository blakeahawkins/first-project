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
  var queryURL = "https://rest.bandsintown.com/artists/" +
    artistName + "/events?app_id=codingbootcamp&date=" + dateRange
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    $.each(response, function() {
      
    })
  })
}