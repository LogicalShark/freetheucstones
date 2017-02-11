function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.4435, lng: 79.9435},
    zoom: 9
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
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


clicks = 0;
bossClicks = 10;
function freeStone()
{
  alert("Stone freed!");
}
function freeStoneClick()
{
  if(clicks>(Math.random()*10))
  {
   freeStone()
   clicks = 0;
  }
  clicks+=1;
}

function defeatBoss()
{
  alert("Boss defeated!");
  document.getElementById("boss").style="display:none;"
}
function bossFightClick()
{
  if(clicks>(bossClicks)
  {
   defeatBoss()
   clicks = 0;
  }
  clicks+=1;
}
