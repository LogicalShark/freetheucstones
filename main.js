clicks = 0;
bossClicks = 10;
username = "";
function register()
{
  username = document.getElementById("username").value;
  console.log(username);
  if(!firebase.database().ref(username).exists())
  {
    firebase.database().ref(username).set({
      stones: 0,
      bosses: 0,
      level: 0
    });
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
  firebase.database().ref(username).once('value').then(function(snapshot) {
    var stones = snapshot.val().stones;
    console.log(stones);
    var bosses = snapshot.val().bosses;
    var level = snapshot.val().level;
  });
  return [stones,bosses,level];
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
  var data = getData();
  if(username=="")
  {
    alert("Please log in!");
  }
  else
  {
    firebase.database().ref(username).set({
      stones: getData()[0]+1
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
  firebase.database().ref(username).set({
    bosses: getData()[1]+1
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
  var database = firebase.database();
  database.ref(username).once('value').then(function(snapshot) {
    var stones = snapshot.val().stones;
    var bosses = snapshot.val().bosses;
    var level = snapshot.val().level;
  });
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = snapshot.val().username;
    document.getElementById("leaderboard").innerHTML = stones+" "+bosses+" "+username+"<br>";
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
