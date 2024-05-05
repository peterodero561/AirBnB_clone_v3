$(document).ready(function() {
    // Array to store checked amenities
    let checkedAmenities = [];

    // Listen for changes on checkbox
    $('.amenity-checkbox').change(function() {
        let amenityID = $(this).parent().data('id');
        let amenityName = $(this).parent().data('name');
        
        if (this.checked) {
            checkedAmenities.push(amenityID);
        } else {
            let index = checkedAmenities.indexOf(amenityID);
            if (index !== -1) {
                checkedAmenities.splice(index, 1);
            }
        }

        // Update the h4 tag with the list of checked amenities
        $('#amenities-list').text(checkedAmenities.join(', '));
    });

    // Function to handle button click event
    $('button').click(function() {
        // Send a new POST request to places_search with the list of checked amenities
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: checkedAmenities })
        })
        .then(response => response.json())
        .then(data => {
            // Clear existing places
            $('.places').empty();

            // Loop through places data and create article tags
            data.forEach(place => {
                let article = $('<article>');
                let titleBox = $('<div>').addClass('title_box');
                let title = $('<h2>').text(place.name);
                let priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
                titleBox.append(title, priceByNight);
                let information = $('<div>').addClass('information');
                let maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
                let numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
                let numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
                information.append(maxGuest, numberRooms, numberBathrooms);
                let description = $('<div>').addClass('description').html(place.description);
                article.append(titleBox, information, description);
                $('.places').append(article);
            });
        })
        .catch(error => {
            console.error('Error fetching places:', error);
        });
    });

    // Request API status
    fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
            // Check if status is "OK"
            if (data.status === 'OK') {
                // Add the class "available" to the api_status div
                $('#api_status').addClass('available');
            } else {
                // Remove the class "available" from the api_status div
                $('#api_status').removeClass('available');
            }
        })
        .catch(error => {
            console.error('Error fetching API status:', error);
        });
});
