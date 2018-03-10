
// Initial array of movies
var topic = ["American Football", "Bowling", "Softball", "Swimming"];

// Function for displaying movie data
function renderButtons() {
  // $("#topic-input").val("");
  $("#topic-view").empty();
  for (i=0; i < topic.length; i++) {
    var a = $("<button>");

    a.addClass("topic");

    a.attr({"data-name" : topic[i]});

    a.text(topic[i]);

    $("#topic-view").append(a);
  }


  // Delete the content inside the movies-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)

  // Loop through the array of movies, then generate buttons for each movie in the array

}

// Calling the renderButtons function to display the initial list of movies
renderButtons();

// This function handles events where the add movie button is clicked
$("#add-topic").on("click", function(event) {
  // event.preventDefault() prevents submit button from trying to send a form.
  // Using a submit button instead of a regular button allows the user to hit
  // "Enter" instead of clicking the button if desired
  event.preventDefault();
  var addTopic = $("#topic-input").val().trim();
  // console.log(addMovie);
  topic.push(addTopic);
  console.log(topic);

  // Write code to grab the text the user types into the input field
  // Write code to add the new movie into the movies array

  // The renderButtons function is called, rendering the list of movie buttons
  renderButtons();
});


$(".topic").on("click", function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var getGIF = $(this).attr("data-name");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    getGIF + "&api_key=dc6zaTOxFJmzC&limit=9";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      console.log(response);
      $("#content").empty()
      // Storing an array of results in the results variable
      var results = response.data;
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var sportImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          sportImage.attr("src", results[i].images.fixed_height_still.url);
          sportImage.attr({"data-still" : results[i].images.fixed_height_still.url}); 
          sportImage.attr({"data-animate" : results[i].images.fixed_height.url});
          sportImage.attr({"data-state" : "still"});
          sportImage.addClass("gif");
          // a.attr({"data-name" : topic[i]});
          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(sportImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#content").append(gifDiv);
        }
      }
    });
});

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});