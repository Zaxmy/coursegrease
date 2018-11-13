// ==UserScript==
// @name     coursegrease
// @description Adds CSV export funcionality to "kurs"
// @author  Johan Zaxmy <johan.zaxmy@his.se>
// @version  1.0
// @match https://personal.his.se/mina-verktyg/kurs/*
// @run-at   document-idle
// @grant    none
// @license GPL-3.0+; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==


var divvar = document.getElementsByClassName("participant");
var antal = divvar.length;

var csv_data = "";

var reggad  = "studiedeltagande.studenthantering.deltagare.tillstand.registrerad";

for (var i=0; i < antal; i++){
  if ( divvar[i].attributes["data-status"].nodeValue == reggad) {
     var PNR = divvar[i].childNodes[1].innerText.trim();
     var name = divvar[i].childNodes[3].childNodes[0].nodeValue.trim();
     var email = divvar[i].childNodes[3].childNodes[1].innerText.trim().substr(0,23);
     csv_data += PNR + ";" + name + ";" + email + "\n";
  }
}

function copyCSVText(){
  var textArea = document.createElement('textarea');
  textArea.setAttribute("type","hidden");
  textArea.append(document.createTextNode(csv_data));
  textArea.select();
    document.execCommand("copy");
}

var docs = document.getElementsByClassName("document-list")[0];
var li = document.createElement('li');
var a = document.createElement('a');
a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv_data);
a.download = 'data.csv';
var linkTxt = document.createTextNode("Download CSV");
a.appendChild(linkTxt);
li.appendChild(a);
docs.appendChild(li);

var liBtn = document.createElement('li');
// Hidden textArea
var textArea = document.createElement('textarea');
textArea.name="hidden_csv";
textArea.append(document.createTextNode(csv_data));
// Ugly hack
textArea.style.height = "0px";
textArea.style.width = "0px";
textArea.style.opacity ="0";

// Button
var btn = document.createElement('button');
btn.innerHTML = "Copy CSV to clipboard";

// Event handler
btn.addEventListener("click",
function(){
  var area = document.getElementsByName("hidden_csv")[0];
  area.select();
    document.execCommand("copy");
  //alert("CSV is on clipboard");
});                     
btn.name="copy-csv-text-btn";
liBtn.appendChild(btn);
liBtn.appendChild(textArea);
docs.appendChild(liBtn);

