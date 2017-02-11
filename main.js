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
}
function login()
{
  username = document.getElementById("username").value;
  document.getElementById("username").style="display:none;";
  document.getElementById("login").style="display:none;";
  document.getElementById("register").style="display:none;";
}
function getData()
{
  console.log(username);
  data = []
  firebase.database().ref("users/"+username).once('value').then(function(snapshot) {
    var Dstones = snapshot.val().stones;
    var Dbosses = snapshot.val().bosses;
    var Dlevel = snapshot.val().level;
    data = [Dstones,Dbosses,Dlevel]
  });
  return data;
}
function bf1()
{
 alert("Looks like you’re out of blocks!"); 
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
  switch(getData()[1])
  {
    case 1: bf1() 
    case 2: bf2()
    case 3: bf3()
    case 4: bf4()
    case 5: bf5()
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
    var data = getData();
    firebase.database().ref("users/"+username).set({
      stones: data[0]+1
    });
    if(data[0]%4==0 || Math.random()<1) //0.2
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
  var data = getData();
  firebase.database().ref("users/"+username).set({
    bosses: data[1]+1
  });
  var elem = document.getElementById("boss");
  elem.parentNode.removeChild(elem);
}
function bossFightClick()
{
  var bossClicks = (getData()[1]*2)+3;
  if(clicks>bossClicks)
  {
   defeatBoss();
   clicks = 0;
  }
  clicks+=1;
}
function bossEncounter()
{
  var b = document.createElement(img);
  b.src="images/culinart.png";
  b.id="boss";
  b.onClick = "bossFightClick()";
  document.getElementById("map").appendChild(b); 
}
function stoneComplain()
{
  var x = Math.random();
  if(x<0.1)
    alert("Call the campus police!");
  else if(x<0.2)
    alert("This doesn’t rock at all");
  else if(x<0.3)
    alert("Don't take me for granite");
  else if(x<0.4)
    alert("Give me liberty or give me liberty!");
  else if(x<0.5)
    alert("Help me...");
  else if(x<0.6)
    alert("It feels like I've hit rock bottom.");
  else if(x<0.7)
    alert("Leave no stone unturned!");
  else if(x<0.8)
    alert("Saving me is sedimentary my dear watson");
  else if(x<0.9)
    alert("The real jailhouse rock.");
  else if(x<0.99)
    alert("You need to be boulder to save me");
  else
    alert("Thanks for playing FtUCS!");
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
