//create variables 
let map;
let marker;
let myLatlng = new google.maps.LatLng(24.466617534719116,54.36866526468188);
let geocoder = new google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();

//initialize Map
function initialize(){
    const mapOptions = {
        zoom: 18,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.querySelector(".mapModel #myMap"), mapOptions);

    marker = new google.maps.Marker({
        map: map,
        position: myLatlng,
        draggable: true 
    }); 

    geocoder.geocode({'latLng': myLatlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                $('#latitude,#longitude').show();
                $('#address').val(results[0].formatted_address);
                $('#latitude').val(marker.getPosition().lat());
                $('#longitude').val(marker.getPosition().lng());
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            }
        }
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#address').val(results[0].formatted_address);
                    $('#latitude').val(marker.getPosition().lat());
                    $('#longitude').val(marker.getPosition().lng());
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                }
            }
        });
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
