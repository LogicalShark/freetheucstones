clicks = 0;
bossClicks = 10;
username = "";
exists = false;
function register()
{
  username = document.getElementById("username").value;
  firebase.database().ref("users").once('value', function(snapshot) {
    if (snapshot.hasChild(username)) {
      exists = true;
    }
  });
  if(!exists)
  {
    firebase.database().ref("users/"+username).set({
      stones: 0,
      bosses: 0,
    });
  }
  else
  {
    alert("Username taken!");
  }
  document.getElementById("username").style="display:none;";
  document.getElementById("login").style="display:none;";
  document.getElementById("register").style="display:none;";
//   getData();
}
function login()
{
  username = document.getElementById("username").value;
  document.getElementById("username").style="display:none;";
  document.getElementById("login").style="display:none;";
  document.getElementById("register").style="display:none;";
//   getData();
}
function bossEncounter()
{ 
  alert("A boss is approaching!");
    var d;
    var user = firebase.database().ref("users").child(username);
    user.on("value", function(snapshot)
               {
      d = snapshot.val();
      var x = d["stones"];
      var b = d["bosses"];
      switch(Math.floor(Math.random()*6))//b
      {
        case 0: window.location.assign("battle.html");
          break;
        case 1: window.location.assign("battle1.html");
          break;
        case 2: window.location.assign("battle2.html");
          break;
        case 3: window.location.assign("battle3.html");
          break;
        case 4: window.location.assign("battle4.html");
          break;
        case 5: window.location.assign("battle5.html");
          break;
        default: window.location.assign("battle.html");
      }
      user.update({
        "stones": x,
        "bosses": b+1
      });
    });
}
function freeStone()
{
  alert("Stone freed!");
  if(username=="")
  {
    alert("Please log in to save your data!");
  }
  else
  {
    var d;
    var user = firebase.database().ref("users").child(username);
    user.on("value", function(snapshot)
               {
      d = snapshot.val();
      var x = d["stones"] + 1;
      var b = d["bosses"];
      user.update({
        "stones": x,
        "bosses": b
      });
    });
    if(Math.random()<1) //0.2
    {
      bossEncounter();
    }
  }
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
}
function bossFightClick()
{
  var d;
  var user = firebase.database().ref("users").child(username);
  user.on("value", function(snapshot)
             {
    d = snapshot.val();
    var x = d["stones"];
    var b = d["bosses"];
    clicks+=1;
    var bossClicks = (b*2)+3;
    if(clicks>bossClicks)
    {
     defeatBoss();
     clicks = 0;
    }
  });
}

function loadLeaderboard()
{
  var users = firebase.database().ref("users");
  users.orderByKey().limitToFirst(100);
  users.once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var lastKey = childSnapshot.key();
      var data = []
      var stones = childSnapshot.val().stones;
      var bosses = childSnapshot.val().bosses;
      var level = childSnapshot.val().level;
      data.append([lastKey,stones,bosses]);
      var rows = document.getElementById("leaderboard").childNodes() ;
      var cols = rows[i].childNodes();
      cols[0].innerHTML = lastKey;
      cols[1].innerHTML = stones;
      cols[2].innerHTML = bosses;
      })
    });
}
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function addResponse() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
