// From MDN
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randChoice(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

markers = [];

function randRockText() {
    var x = Math.random();
    var rockText;
    if(x<0.1)
        rockText = "Call the campus police!";
    else if(x<0.2)
        rockText = "This doesn’t rock at all";
    else if(x<0.3)
        rockText = "Don't take me for granite";
    else if(x<0.4)
        rockText = "Give me liberty or give me liberty!";
    else if(x<0.5)
        rockText = "Help me...";
    else if(x<0.6)
        rockText = "It feels like I've hit rock bottom.";
    else if(x<0.7)
        rockText = "Leave no stone unturned!";
    else if(x<0.8)
        rockText = "Saving me is sedimentary my dear watson";
    else if(x<0.9)
        rockText = "The real jailhouse rock.";
    else if(x<0.99)
        rockText = "You need to be boulder to save me";
    else
        rockText = "Thanks for playing FUCS!";

    return rockText;
}

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

    infoWindow = new google.maps.InfoWindow({map: map});
    infoWindowRock = new google.maps.InfoWindow({map: map});


    rockPaths = [
        "images/rock_small2_1.png",
        "images/rock_small2.png",
        "images/rock_small3.png",
        "images/rock_small4.png",
        "images/rock_small5.png",
        "images/rock_small6.png"];


    for (var i = 0; i < stones; i++)
    {
        randPos = new google.maps.LatLng(randRange(lat1, lat0),
            randRange(lon0, lon1));

        var rockChance = Math.random();
        var rockIcon;
        if (rockChance < 0.7) {
            rockIcon = randChoice(rockPaths.slice(0,2));
        } else {
            rockIcon = randChoice(rockPaths.slice(2));
        }

        //console.log(rockIcon);

        var marker = new google.maps.Marker({
            position: randPos,
            map: map,
            icon: rockIcon,
            title:"UC Stone",
            freed: false
        });

        var textInfowindow = new google.maps.InfoWindow({
            content: randRockText()
        });

        marker.addListener('click', (function(marker, content, infoWindow){
            return function() {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            };
        })(marker, randRockText(),infoWindowRock));
        markers.push(marker);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            showMyPosition(position);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function showMyPosition(position)
{
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;
    var myPos = {lat: myLat, lng: myLng};
    infoWindow.setPosition(myPos);
    infoWindow.setContent("My location");

    var myCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        setMap: map,
        center: myPos,
        radius: 50
    });

    return myPos;
};

function detect()
{
    var freeRockPaths = [
        "images/rock_small_free2.png",
        "images/rock_small_free2.png",
        "images/rock_small_free3.png",
        "images/rock_small_free4.png",
        "images/rock_small_free5.png",
        "images/rock_small_free6.png"];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var myPos = showMyPosition(position);
            myLat = myPos.lat;
            myLng = myPos.lng;

            // Markers stuff

            var alerted = false;
            for(var i = 0; i<markers.length; i++)
            {
                var m = markers[i];
                if (!markers[i].freed) {
                    var markerlat = m.getPosition().lat();
                    var markerlng = m.getPosition().lng();
                    var dist = Math.sqrt(Math.pow((myLat - markerlat), 2) +
                        Math.pow((myLng - markerlng), 2));
                    if (dist <= .0014) //.00014
                    {
                        if (!alerted) {
                            freeStone();
                            alerted = true;
                        }
                        iconIndex = rockPaths.indexOf(markers[i].getIcon());
                        markers[i].setIcon(freeRockPaths[iconIndex]);
                        console.log(markers[i].getIcon());
                    }
                    markers[i].freed = true;
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

