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
      level: 0
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
function getData()
{
  console.log(username);
  firebase.database().ref("users/"+username).once('value').then(function(snapshot) {
    var s = snapshot.val();
    var data = [];
    for(var key in s) {
      var stones = s[key].stones;
      var bosses = s[key].bosses;
      data.push([stones,bosses]);
    }
    var st = document.createElement("p");
    st.id="stones";
    st.innerHTML = data[0];
    st.style="display:none;";
    var bo = document.createElement("p");    
    bo.id="bosses";
    bo.innerHTML = data[1];
    bo.style="display:none;";
    document.body.appendChild(st);
    document.body.appendChild(bo);
    console.log(data[1]);
  });
}
function bf1()
{
}
function bf2()
{
  alert("This’ll only take a single 112 minute!"); 
  
}
function bf3()
{
 alert("It’s “Doctor President” Subra Suresh!"); 
  
}
function bf4()
{
 alert("Who even am I?"); 
  
}
function bf5()
{
 alert("I’ve got nerves of steel!"); 
}
function bossEncounter()
{ 
  alert("A boss is approaching!");
  bf1();
  switch(1)
  {
    case 1: window.location("battle.html");
      break;
    case 2: window.location("battle2.html");
      break;
    case 3: window.location("battle3.html");
      break;
    case 4: window.location("battle4.html");
      break;
    case 5:   window.location("battle5.html");
      break;
    default: window.location("battle5.html");
  }

}
function freeStone()
{
  alert("Stone freed!");
  if(username=="")
  {
    alert("Please log in!");
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
    console.log("boss");
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
  var data = [document.getElementById("stones").innerHTML, document.getElementById("bosses").innerHTML];
  firebase.database().ref("users/"+username).set({
    bosses: data[1]+1
  });
  var elem = document.getElementById("boss");
  elem.parentNode.removeChild(elem);
}
function bossFightClick()
{
  var data = [document.getElementById("stones").innerHTML, document.getElementById("bosses").innerHTML];
  var bossClicks = (data[1]*2)+3;
  if(clicks>bossClicks)
  {
   defeatBoss();
   clicks = 0;
  }
  clicks+=1;
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
