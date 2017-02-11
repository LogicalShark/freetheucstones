// From MDN
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}
function initMap() {
    var stones = 10;
    var centerLocation = {lat: 40.442706, lng: -79.943677};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: centerLocation
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    var lat0 = 40.444398;
    var lon0 = -79.946631;
    var lat1 = 40.441393;
    var lon1 = -79.940703;

    var rock_small2 = "images/rock_small2.png";

    var markers = [];
    for (var i = 0; i < stones; i++)
    {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(randRange(lat1, lat0),
                                             randRange(lon0, lon1)),
            map: map,
            icon: rock_small2,
            title:"UC Stone"
        });
        marker.addListener('click', stoneComplain());
        markers.push(marker);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

