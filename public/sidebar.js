var groups = [ 'test1' , 'test2' , 'Hamada'];

var out = "";
out += '<li><a href="index.html">Home</a></li>';

for (i in groups) {
  var grpstr = ""; grpstr += "'" + groups[i] + "'";
  out += '<li><a href="groups.html" onclick="chooseGroup('+grpstr+');">'+groups[i]+'</a></li>';
}

document.getElementById('l_list').innerHTML = out;
