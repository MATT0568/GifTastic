window.onload = function () {
  renderButtons();
  $("#add-gif").on("click", function (event) {
    event.preventDefault();
    var cartoon = $("#cartoon-input").val().trim();
    cartoons.push(cartoon);
    renderButtons();
  });
};

var cartoons = ["simpsons", "futurama", "Rick and Morty", "king of the hill"];

function displayMovieInfo() {
  var cartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=TLn3pmCU154sUvV29ur328v5m46Ssp9L";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < 9; i++) {
      var cartoonDiv = $("<div class='cartoon'>");

      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      cartoonDiv.append(p);

      var stillUrl = response.data[i].images.original_still.url;
      var animateUrl = response.data[i].images.original.url;
      var cartoonImage = $("<img class='images'>");
      cartoonImage.attr("src", stillUrl);
      cartoonImage.attr("data-still", stillUrl);
      cartoonImage.attr("data-animate", animateUrl);
      cartoonImage.attr("data-animate", animateUrl);
      cartoonImage.attr("data-state", "still");
      cartoonDiv.append(cartoonImage);

      $("#gif-view").prepend(cartoonDiv);
    }
  });

}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < cartoons.length; i++) {
    var a = $("<button>");
    a.addClass("gif-btn btn btn-secondary");
    a.attr("data-name", cartoons[i]);
    a.attr("style", "margin-right: 15px;margin-bottom: 15px;");
    a.text(cartoons[i]);
    $("#buttons-view").append(a);
  }
}

$(document).on("click", ".images", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$(document).on("click", ".gif-btn", displayMovieInfo);