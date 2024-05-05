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
            console.error('Error:', error);
        });
});
