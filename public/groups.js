
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

//turns each html charcter to a like uuhhhh a text charcter
function htmlEncode( input ) {
    return String(input).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function uploadPost() {
  var pname = document.getElementById("pname").value;
  if (pname == "") pname = "Anonymous";
  var psubject = document.getElementById("psubject").value;
  var pcontent = document.getElementById("pcontent").value;
  var pdate = ( new Date() ).toUTCString();

  pname = htmlEncode( pname );
  psubject = htmlEncode( psubject );
  pcontent = htmlEncode( pcontent );

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
function Deletepost(input){
	firebase.database().ref('groups/' + gpid + '/' + input).remove();
}

var gpid = sessionStorage.getItem('cg');
if (gpid == null) gpid = "test1";
document.getElementById("gpid").innerHTML = "Group id : " + gpid;

var pstr = "";
database.ref('groups/' + gpid).once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var cont = htmlEncode(childData.pcontent);
    var name = htmlEncode(childData.pname);
    var subj = htmlEncode(childData.psubject);
    var dat = childData.pdate;

    var convert = function(convert){
      return ("<span />", { html: convert }).text();
    };

 		pstr += "<hr size=\"10\" color=\"575a87\">"
    pstr += "<br>";
    pstr += "<h5 style=\"display:inline;\">" + name + "</h5> <h6 style=\"display:inline;\">@: " + dat + "</h6><br>";
    pstr += "<h3>" + subj + "</h3>";
    pstr += cont + "<br>";
    pstr += "<button align=\"right\" style = \"background-color: #f44336; color: white; border: none;\"	onclick=\"Deletepost("+childKey+");location.reload();\">Delete</button>"
    pstr += "<br>";

    document.getElementById("pdisplay").innerHTML = pstr;

  });
});
