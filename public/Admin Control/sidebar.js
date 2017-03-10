var groups = ['test1','test2','Hamada','J1' , 'J2' , 'J3','J4','J5','J6','M1','M2','M3','S1','S2','S3','G1' , 'G2' , 'G3','G4','G5','G6','G7','G8','G9','G10','G11','G12','Other'];

var out = "";

for (i in groups) {
  var grpstr = ""; grpstr += "'" + groups[i] + "'";
  out += '<li><a href="groups.html" onclick="chooseGroup('+grpstr+');">'+groups[i]+'</a></li>';
}

document.getElementById('l_list').innerHTML = out;
