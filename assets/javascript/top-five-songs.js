// Javascript for Code that Dynamically Writes the Artist's Top Songs to the HTML

// Add JS Code below
$(document).ready(function() {

    // clear out any prior song lists and videos
    $("#top-songs").empty();
    $("#top-video").empty();

    // Grabbing and storing the selected artist property value from the button
    var bandInput = "";
    var results = "";
    var topSong = "";

    $(".search-button").on("click", function() {
        console.log("Button clicked");

        bandInput = $("#band-input").val().trim();
        console.log("Artist Requested: " + bandInput);

        printSongs();
        addVideo();
    });



    function printSongs() {
        //Empty the div with the top-songs ID
        $("#top-songs").empty();
    
        var queryURL1 = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + bandInput + 
        "&api_key=8ebc9b04f203d069a8e6992620b4b37b&format=json";
        
        // Performing an AJAX request with the queryURL
        $.ajax({
        url: queryURL1,
        method: "GET"
        }).then(function(response) {
            console.log("queryURL1: " + queryURL1);
            console.log(response);

            results = response.toptracks.track;
            console.log(response.toptracks.track);

            // Looping through the top 3 songs of each result
            for (var i = 0; i < 3; i++) {

                // Creating and storing a div tag
                var trackDiv = $("<div class='track'>");
        
                // Creating a paragraph tag with the result item's name
                var pName = $("<p>").text("Number " + (i+1) + " Song: " + results[i].name);
        
                // setting the src attribute of the name to a url from the result item
                pName.attr("src", results[i].url);
                console.log(results[i].url);

                // Appending the paragraph to the trackDiv
                trackDiv.append(pName);
        
                // Prependng the trackDiv to the HTML page in the "#top-songs" div
                $("#top-songs").append(trackDiv);
            }

            topSong = results[0].name;
            console.log("Top Song: " + topSong);

//            bandInput.attr("top-song", topSong);

        });

    }

    function addVideo() {
        //Empty the div with the top-video ID
        $("#top-video").empty();


        // youtube key: AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo
        console.log("Artist: " + bandInput);
        console.log("Top Song: " + topSong);
        var queryURL2 = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + bandInput + " " + topSong + "&type=video&key=AIzaSyCN6p-zygNG_t-KHdAHG_juKUT_X_AMFYo"; 

        // Performing an AJAX request with the queryURL
        $.ajax({
        url: queryURL2,
        method: "GET"
        }).then(function(response) {
            console.log("queryURL2: " + queryURL2);

            console.log(response);


            // Creating and storing a div tag
            // var videoDiv = $("<div class='track'>");
    
            //var videoDiv = $("<iframe id="ytplayer" type="text/html" width="640" height="360"
            //src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            //frameborder="0"></iframe>");


            // // setting the src attribute of the name to a url from the result item
            // pName.attr("src", results[i].url);

            // // Appending the paragraph and image tag to the trackDiv
            // trackDiv.append(pName);
    
            // Prependng the trackDiv to the HTML page in the "#gifs-appear-here" div
            $("#top-video").prepend(videoDiv);

        });

        // //----------------------------code from YouTube
        // // 2. This code loads the IFrame Player API code asynchronously.
        // var tag = document.createElement('script');

        // tag.src = "https://www.youtube.com/iframe_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // // 3. This function creates an <iframe> (and YouTube player)
        // //    after the API code downloads.
        // var player;
        // function onYouTubeIframeAPIReady() {
        //     player = new YT.Player('top-video', {
        //     height: '390',
        //     width: '640',
        //     videoId: 'M7lc1UVf-VE',
        //     events: {
        //         'onReady': onPlayerReady,
        //         'onStateChange': onPlayerStateChange
        //     }
        //     });
        // }

        // // 4. The API will call this function when the video player is ready.
        // function onPlayerReady(event) {
        //     event.target.playVideo();
        // }

        // // 5. The API calls this function when the player's state changes.
        // //    The function indicates that when playing a video (state=1),
        // //    the player should play for six seconds and then stop.
        // var done = false;
        // function onPlayerStateChange(event) {
        //     if (event.data == YT.PlayerState.PLAYING && !done) {
        //     setTimeout(stopVideo, 6000);
        //     done = true;
        //     }
        // }
        // function stopVideo() {
        //     player.stopVideo();
        // }


        
    }


});
