var netflix = ["Bojack Horseman", "Stranger Things", "The Crown", "Orange is the New Black", "Making a Murderer"];


console.log(netflix);






    // Buttons //    
      function netflixButtons() {
        console.log('this buttons ran');
        // Deletes the movies prior to adding new shows
    
        $(".netButtons").empty();
        // Loops through the array of shows
        for (var i = 0; i < netflix.length; i++) {

          var a = $("<button>");
          
          
          // Adds a class of shows to button
          a.addClass("netflix-shows btn-danger");

          a.attr("data-name", netflix[i]);

          a.text(netflix[i]);

          $(".netButtons").append(a);
        }
      }




function displayGifs(){

    var netflixShow = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + netflixShow + "&api_key=gf50qMOfBkYjMqHHumOdKDnDXZFBAYQR&limit=10";

    console.log(queryURL);
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
     
        $(".gifContainer").empty();
  
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        console.log('for loop runas');
        console.log(results[i]);

            var netflixDiv = $("<div>");

            var rating = results[i].rating;
            console.log("Rating: " + rating);
            
            var p = $("<p>").text("Rating: " + rating);

            var netflixImage = $("<img>");
            netflixImage.attr("class", "eachGif");
            netflixImage.attr("src", results[i].images.fixed_height_still.url);
            netflixImage.attr("data-still", results[i].images.fixed_height_still.url);
            netflixImage.attr("data-animate", results[i].images.fixed_height.url);
            netflixImage.data("state","still");

            netflixDiv.prepend(p);
            netflixDiv.prepend(netflixImage);

            $(".gifContainer").prepend(netflixDiv);

        }

        //stills animation//
        $(".eachGif").on("click", function() {
      
            var state = $(this).data("state");
            console.log(state);

            if (state === 'still') {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).data("state", "animate");
  
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).data("state", "still");
            }

        });

    });

}


      // This function handles events where the add movie button is clicked
      $(".showButton").on("click", function(event) {
        event.preventDefault();
        console.log("this showbutton ran")

        var netshows = $("#netflix-input").val().trim();

 
        netflix.push(netshows);

        netflixButtons();
      });





$(document).on("click", ".netflix-shows", displayGifs);
netflixButtons();



