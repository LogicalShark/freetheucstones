// From MDN
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}
markers = [];    
function initMap() {
    var stones = 10;
    var centerLocation = {lat: 40.442706, lng: -79.943677};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: centerLocation
    });
    var lat0 = 40.444398;
    var lon0 = -79.946631;
    var lat1 = 40.441393;
    var lon1 = -79.940703;

    var rock_small2 = "images/rock_small2.png";

    for (var i = 0; i < stones; i++)
    {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(randRange(lat1, lat0),
                                             randRange(lon0, lon1)),
            map: map,
            icon: rock_small2,
            title:"UC Stone"
        });
        marker.addListener('click', function(){stoneComplain()});
        markers.push(marker);
    }
        infoWindow = new google.maps.InfoWindow({map: map});
}
function detect()
{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          for(var i = 0; i<markers.length; i++)
          {
              var m = markers[i];
              var markerlat = m.getPosition().lat();
              var markerlng = m.getPosition().lng();
              if(Math.sqrt((lat-markerlat)^2 + (lng-markerlng)^2)<=.0014) //.00014
              {
                  freeStone();
              }
          }
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

