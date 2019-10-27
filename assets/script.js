// Wait for document to load
$(document).ready(function () {

    // Initialize array for default buttons
    var animals = ["Bird", "Cat", "Dog"];
    console.log(animals);

    // Dynamically generate animal buttons for each animal in array
    function renderButtons() {
        // Delete animal buttons prior to adding new buttons
        $("#buttons-view").empty();
        // Loop through array of animals
        for (var i = 0; i < animals.length; i++) {
            console.log(animals[i]);

            // Creates start and end tags (<button></button>)
            var newBtn = $("<button>");
            // Add animal class
            newBtn.addClass("animal");
            // Add BootStrap class for spacing
            newBtn.addClass("mx-1");
            // Add data-attribute with a value of animal at index i
            newBtn.attr("data-animal", animals[i]);
            // Provide button's text with value of animal at index i
            newBtn.text(animals[i]);
            // Add button to the HTML
            $("#buttons-view").append(newBtn);
        }
    }
    // Call function
    renderButtons();

    // Add click event listener to add animal buttons
    $("#add-animal").on("click", function (event) {
        // Prevent form from trying to submit itself
        // Form can be submitted when user hits enter key instead of clicking button
        event.preventDefault();
        // Grab text from input box, trim margins
        var animalInput = $("#animal-input").val().trim();
        if (animalInput) {
            // Add animal from textbox to array
            animals.push(animalInput);
            console.log(animalInput);
            // Call function to handle processing array
            renderButtons();
            $("#animal-input").val("");
        }
    });

    // Add click event listener to all animal buttons to display the appropriate content
    $(document).on("click", "button", function () {
        // Grab, store data-animal property value from button
        var animal = $(this).attr("data-animal");
        // Construct queryURL using animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal +
            "&api_key=9iCtnbt3iMLZtI9xANJQ1k4IdAT2jegT";

        // Perform AJAX request with queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(response);
                // Store data from AJAX request in results variable
                var results = response.data;
                // Loop through result items
                for (let i = 0; i < results.length; i++) {
                    // Create, store div tag
                    var animalDiv = $("<div>");
                    // Create, store image tag, and save still, moving images pulled off result item
                    var animalImage = $("<img>");
                    var movingImage = results[i].images.fixed_height.url;
                    var stillImage = results[i].images.fixed_height_still.url;
                    // Assign moving, still attributes to image tag
                    animalImage.attr("data-moving", movingImage);
                    animalImage.attr("data-still", stillImage);
                    // Set src attribute of still image to image tag 
                    animalImage.attr("src", stillImage);
                    // Create paragraph tag with the result item's title
                    var title = $("<p>").text("Title:  " + results[i].title);
                    // Append image tag to the animalDiv
                    animalDiv.append(animalImage);
                    // Append title paragragh to animalDiv, line break
                    animalDiv.append(title);
                    animalDiv.append("<br>");
                    // Prepend animalDiv to the HTML page in the "#animal-gifs" div
                    // Sends previous gifs to end of page
                    $("#animal-gifs").prepend(animalDiv);
                }
            });
    });

    // Add click event listener to each image tag to toggle still to moving gif
    $(document).on("click", "img", function () {
        var imgTag = $(this);
        var still = imgTag.attr("data-still");
        var moving = imgTag.attr("data-moving");
        if (imgTag.attr("src") == still) {
            imgTag.attr("src", moving);
        }
        else {
            imgTag.attr("src", still);
        }
    });

});

// Copyright 2019 Dean A McCluskey