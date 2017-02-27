
var config = {
  apiKey: "AIzaSyDtLkZM2GTYbIdIP-IiSmd4tC5A1K3R1mk",
  authDomain: "riadasn-21318.firebaseapp.com",
  databaseURL: "https://riadasn-21318.firebaseio.com",
};
firebase.initializeApp(config);

var database = firebase.database();

var pcounterRef = firebase.database().ref('pcounter');
var pcount=-1;
pcounterRef.on('value', function(snapshot) {
  pcount = snapshot.val();
  document.getElementById("postbutton").disabled = false;
});

function uploadPost() {
  var pname = document.getElementById("pname").value;
  if (pname == "") pname = "Anonymous";
  var psubject = document.getElementById("psubject").value;
  var pcontent = document.getElementById("pcontent").value;
  var pdate = ( new Date() ).toUTCString();

  /*firebase.database().ref('groups/' + gpid + '/' + pcount).set({
    pname: pname,
    psubject: psubject,
    pcontent: pcontent,
    pdate: pdate
  }).then(
    function() {
      pcounterRef.transaction(function(currentValue) {
          return currentValue + 1;
      });
      alert("The post was published with ID : " + pcount);
      location.reload();
    }
  );*/
  firebase.database().ref('groups/' + gpid + '/' + pcount).set(
    {
      pname: pname,
      psubject: psubject,
      pcontent: pcontent,
      pdate: pdate
    }
  ).then(
    function() {
      alert("The post was published with ID : " + pcount);
      pcounterRef.transaction(function(currentValue) {
          return currentValue + 1;
      });
      location.reload();
    }
  );
}

var gpid = sessionStorage.getItem('cg');
if (gpid == null) gpid = "test1";
document.getElementById("gpid").innerHTML = "Group id : " + gpid;

var pstr = "";
database.ref('groups/' + gpid).once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    pstr += "<br>";

    pstr += "<h3>" + childData.psubject + "</h3>";
    pstr += "By : " + childData.pname + ", posted at : " + childData.pdate + "<br>";
    var cont = childData.pcontent;
    for (var i = 0, len = cont.length; i < len; i++){
    	if(cont[i]=='<'||cont[i]=='>'){
    		cont = "<h3 style = \"color : red \">HAAAX!</h3>";
    		console.log("in");
    	};
    }
    pstr += cont	 + "<br>";

    pstr += "<br>";

    document.getElementById("pdisplay").innerHTML = pstr;

  });
});
