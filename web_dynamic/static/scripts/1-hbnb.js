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
});
