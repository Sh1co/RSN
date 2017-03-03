var groups = [ 'test1' , 'test2' , 'Hamada','Hamada1','Hamada2','Hamada3','Hamada4','Hamada5','Hamada6','Hamada7','Hamada8','Hamada9','test1' , 'test2' , 'Hamada','Hamada1','Hamada2','Hamada3','Hamada4','Hamada5','Hamada6','Hamada7','Hamada8','Hamada9'];

var out = "";

for (i in groups) {
  var grpstr = ""; grpstr += "'" + groups[i] + "'";
  out += '<li><a href="groups.html" onclick="chooseGroup('+grpstr+');">'+groups[i]+'</a></li>';
}

document.getElementById('l_list').innerHTML = out;
