// Javascript for Code that Dynamically Writes the Artist's Top Songs to the HTML

// Add JS Code below
$(document).ready(function() {

    // clear out any prior lists
    $("#top-songs").empty();

    // Grabbing and storing the selected artist property value from the button
    var bandInput = $("#band-input");
    // var selectedArtist = $(this).attr("selected-artist");


    // Constructing a queryURL using the topic name
    // var queryURL = "http://ws.audioscrobbler.com/2.0/" +
    // topic + "/2.0/?method=artist.gettoptracks&artist=cher&api_key=YOUR_API_KEY&format=json";

    //  Params
    //      artist (Required (unless mbid)] : The artist name
    //      mbid (Optional) : The musicbrainz id for the artist
    //      autocorrect[0|1] (Optional) : Transform misspelled artist names into correct artist names, returning the correct version instead. The corrected artist name will be returned in the response.
    //      page (Optional) : The page number to fetch. Defaults to first page.
    //      limit (Optional) : The number of results to fetch per page. Defaults to 50.
    //      api_key (Required) : A Last.fm API key.
    // Last.fm API key: 8ebc9b04f203d069a8e6992620b4b37b

    var queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + bandInput + 
    "&api_key=8ebc9b04f203d069a8e6992620b4b37b&format=json";

    var queryURL2 = ""; 

    function printSongs() {

        // Performing an AJAX request with the queryURL
        $.ajax({
        url: queryURL1,
        method: "GET"
        }).then(function(response) {
            console.log(queryURL);

            console.log(response);

            var results = response.toptracks.track;


            // Looping through each result item
            for (var i = 0; i < 5; i++) {

                // Creating and storing a div tag
                var trackDiv = $("<div class='track'>");
        
                // Creating a paragraph tag with the result item's name
                var pName = $("<p>").text("Track Name: " + results[i].name);
        
                // Creating and storing an image tag
                // var topicGif = $("<img>");
        
                //****** */
                // Setting the src attribute of the image to a property pulled off the result item
                // topicGif.attr("src", results[i].images.fixed_height_still.url);
        
                // set other attributes to allow playing and pausing of the gif
                // topicGif.attr("data-still", results[i].images.fixed_height_still.url);
                // topicGif.attr("data-animate", results[i].images.fixed_height.url);
                // topicGif.attr("data-state", "still");
                // topicGif.addClass("gif");
        
                // Appending the paragraph and image tag to the topicDiv
                // topicDiv.append(topicGif);
                // topicDiv.append(p);
        
                // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
                // $("#gifs-appear-here").prepend(topicDiv);
                //****** */

                // setting the src attribute of the name to a url from the result item
                pName.attr("src", results[i].url);

                // Appending the paragraph and image tag to the trackDiv
                trackDiv.append(pName);
        
                // Prependng the trackDiv to the HTML page in the "#gifs-appear-here" div
                $("#top-songs").prepend(trackDiv);
            }
        });


    }

    // dynamically create the list of top songs from a last.fm api call

    // $("#top-songs") = ;

});
