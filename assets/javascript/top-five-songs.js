// Javascript for Code that Dynamically Writes the Artist's Top Songs to the HTML

// Add JS Code below
var videoIdent = "";


$(document).ready(function() {

    // clear out any prior song lists and videos
    $("#top-songs").empty();
    $("#top-video").empty();

    // Grabbing and storing the selected artist property value from the button
    var bandInput = "";
    var results = "";
    var topSong = "";
    // var videoIdent = "";

    $(".search-button").on("click", function() {
        console.log("Button clicked");

        bandInput = $("#band-input").val().trim();
        console.log("Artist Requested: " + bandInput);

        printSongs(getVideoId);

        // addVideo();
        
        console.log("------ end of on-click -------------");
    });



    function printSongs(callback) {
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

            topSong = results[0].name;
            console.log("Top Song: " + topSong);

            // Looping through the top 3 songs of each result
            for (var i = 0; i < 3; i++) {

                // Creating and storing a div tag
                var trackDiv = $("<div class='track'>");
        
                // Creating a paragraph tag with the result item's name
                var pName = $("<p>").text((i+1) + ") " + results[i].name);
        
                // setting the src attribute of the name to a url from the result item
                pName.attr("src", results[i].url);
                console.log(results[i].url);

                // Appending the paragraph to the trackDiv
                trackDiv.append(pName);
        
                // Prependng the trackDiv to the HTML page in the "#top-songs" div
                $("#top-songs").append(trackDiv);
            }

            //            bandInput.attr("top-song", topSong);
            console.log("------ end of printSongs function -------------");

            //RWS: have to call addVideo at the end of the ajax call (and not outside the ajax call) 
            //to avoid addVideo being done before this ajax call is complete 
            getVideoId();    
        });

    }

    function getVideoId() {
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

            videoIdent = response.items[0].id.videoId;

            console.log("videoID: " + videoIdent);

            // addVideo();

            var tempUrl = "https://www.youtube.com/embed/" + videoIdent;
            console.log("video src: " + tempUrl);

            var videoDiv = $("<iframe id='video' type='text/html' width='320' height='200' frameborder='0'></iframe>");
            videoDiv.attr("src", tempUrl);
            $("#top-video").append(videoDiv);            
        });

        console.log("------ end of addVideo function -------------");

    }
});
    // function addVideo() {

        // var tempUrl = "https://www.youtube.com/embed/" + videoIdent;
        // console.log("video src: " + tempUrl);

        // var videoDiv = $("<iframe id='video' type='text/html' width='320' height='180' src='https://www.youtube.com/embed/XmSdTa9kaiQ' frameborder='0'></iframe>");
        // $("#top-video").append(videoDiv);


        // // Load the IFrame Player API code asynchronously.
        // var tag = document.createElement('script');
        // tag.src = "https://www.youtube.com/player_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // // Replace the 'ytplayer' element with an <iframe> and
        // // YouTube player after the API code downloads.
        // var player;
        // function onYouTubePlayerAPIReady() {
        //     player = new YT.Player('top-video', {
        //     height: '360',
        //     width: '640',
        //     videoId: 'XmSdTa9kaiQ'
        //     });
        // }



        // //----------------------------code from YouTube
        // // 2. This code loads the IFrame Player API code asynchronously.
        // var tag = document.createElement('script');

        // tag.src = "https://www.youtube.com/iframe_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // console.log("videoID: " + videoIdent);

        // // 3. This function creates an <iframe> (and YouTube player)
        // //    after the API code downloads.
        // var player;
        // function onYouTubeIframeAPIReady() {
        //     player = new YT.Player('top-video', {
        //     height: '180',
        //     width: '320',
        //     videoId: videoIdent,
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
    // }

// });
