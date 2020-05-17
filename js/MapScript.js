//create variables 
let map;
let marker;
let myLatlng = new google.maps.LatLng(25.2048, 55.2708);
let geocoder = new google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();
let Cities = [
    'Dubai',
    'دبي',
    'Abu Dhabi',
    'أبو ظبي',
    'Sharjah',
    'الشارقة',
    'Ajman',
    'عجمان',
    'Ras Al-Khaima',
    'إمارة رأس الخيمة',
    'Umm Al Quawain',
    'ام القيوين',
    'United Arab Emirates',
    'الإمارات العربية المتحدة'
]

//initialize Map
function initialize(){
    const mapOptions = {
        zoom: 18,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.querySelector(".mapModel #myMap"), mapOptions);
    //setup marker 
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
    //make marker draged and change location when drage marker
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
    //Search Box 
    var searchBox = new google.maps.places.SearchBox(document.getElementById('searchInput'));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('searchInput'));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
    //   searchBox.set('map', null);
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;
      for (i = 0; place = places[i]; i++) {
        (function(place) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            draggable: true
          });
          marker.bindTo('map', searchBox, 'map');
          google.maps.event.addListener(marker, 'map_changed', function() {
            if (!this.getMap()) {
              this.unbindAll();
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
        bounds.extend(place.geometry.location);
        }(place));
      }
      map.fitBounds(bounds);
      searchBox.set('map', map);
      map.setZoom(Math.min(map.getZoom(),18));
    });
}

//Change map when choose city 
$('.cityModel ul li').click(function(){
    if($(this).text() === 'Dubai'){
        myLatlng = new google.maps.LatLng(25.2048, 55.2708);
    }else if($(this).text() === 'Abu Dahbi'){
        myLatlng = new google.maps.LatLng(24.45384005117809,54.377343799999984);
    }else if($(this).text() === 'Sharjah'){
        myLatlng = new google.maps.LatLng(25.34627954011945,55.42069030118865);
    }else if($(this).text() === 'Ajman'){
        myLatlng = new google.maps.LatLng(25.40518742604479,55.5136433);
    }else if($(this).text() === 'Ras Al-Khaima'){
        myLatlng = new google.maps.LatLng(25.800692599999998,55.97624767976226);
    }else if($(this).text() === 'Umm Al-Quwain'){
        myLatlng = new google.maps.LatLng(25.542632400000006,55.54757771534423);
    }else{
        myLatlng = new google.maps.LatLng(24.466617534719116,54.36866526468188);
    }

    //call map function with new longitude and latitude
    initialize();
});

//function to check if client location avaelable or not 
$('#MapContinue').click(function(){
    let Lat = $('#latitude').val();
    let long = $('#longitude').val();
    
    // here call api using ajax with long and lat variable 
});

//Error Message Function
$('.ErrMessage').first().click(function(){
    console.log('close ')
    $('.ErrMessage').fadeOut();
});