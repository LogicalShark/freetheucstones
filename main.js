function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.4435, lng: 79.9435},
    zoom: 12
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
username = "";
function register()
{
  username = document.getElementById("username").value;
  firebase.database().ref(username).set({
    stones: 0,
    bosses: 0,
    level: 0
  });
}
function login()
{
  username = document.getElementById("username");
}
function getData()
{
  firebase.database().ref(username).once('value').then(function(snapshot) {
    var stones = snapshot.val().stones;
    var bosses = snapshot.val().bosses;
    var level = snapshot.val().level;
  });
  return [stones,bosses,level];
}
function freeStone()
{
  alert("Stone freed!");
  document.getElementById("cage").style="display:none;";
  var data = getData();
  firebase.database().ref(username).set({
    stones: getData()[0]+1
  });
}
function freeStoneClick()
{
  if(clicks>(Math.random()*10))
  {
   freeStone();
   clicks = 0;
  }
  clicks+=1;
}

function defeatBoss()
{
  alert("Boss defeated!");
  document.getElementById("boss").style="display:none;";
  var data = getData();
  firebase.database().ref(username).set({
    bosses: getData()[1]+1
  });
}
function bossFightClick()
{
  if(clicks>bossClicks)
  {
   defeatBoss();
   clicks = 0;
  }
  clicks+=1;
}
