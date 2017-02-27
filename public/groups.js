

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
  var pdate = ( new Date() ).toString();

  firebase.database().ref('groups/' + gpid + '/' + pcount).set({
    pname: pname,
    psubject: psubject,
    pcontent: pcontent,
    pdate: pdate
  }).then(
    function() {
      alert("The post was published with ID : " + pcount);
      location.reload();
    }
  );

  pcounterRef.transaction(function(currentValue) {
      return currentValue + 1;
  });
}

var gpid = sessionStorage.getItem('cg');
document.getElementById("gpid").innerHTML = "Group id : " + gpid;
