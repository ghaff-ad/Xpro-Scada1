function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function callall(nick,hls,id){
  setLoadSwitch(nick,hls,id);
  loadMeterValues(nick,id);
};

function connectMeter(){
  xproSendUserMessage("controlMeter",{id:currentMeterID,state:true},function(meters){ 
    if(meters.successFlag){
      document.getElementById('con-status').innerHTML = 'Connected'
    }
   });
}
function disconnectMeter(){
  xproSendUserMessage("controlMeter",{id:currentMeterID,state:false},function(meters){
    if (meters.successFlag){
      document.getElementById('con-status').innerHTML = 'Disconnected'
    }
   });
}

function setLoadSwitch(val,hls,id){
    
    console.log(val,hls,id,Boolean(hls))
    if(hls=='false'){
      document.getElementById("loadSwitchControls").style.display = 'none'
    }
    else{
      document.getElementById("loadSwitchControls").style.display = 'block'
    }

}
function loadMeterValuesCall(nick) {
  document.getElementById("meterName").innerHTML = nick;

  xproSendUserMessage("loadMeterValues", nick, function(data) {
   if(data==null){
    for (let key of paramKeys) {
      try {
        document.getElementById("param_" + key).innerHTML = "##.##";
        document.getElementById("param_ONLINE").innerHTML =  "OFFLINE";
        document.getElementById("param_ONLINE").className =  "offline";
      } catch (error) {
      }
    }
   }else{
    document.getElementById("param_ONLINE").innerHTML = data["ONLINE"] == 1 ? "ONLINE" : "OFFLINE";
    document.getElementById("param_ONLINE").className = data["ONLINE"] == 1 ? "online" : "offline";
    for (let key of paramKeys) {
      try {
        document.getElementById("param_" + key).innerHTML = data[key] === null ? "##.##" :numberWithCommas(data[key]);
      } catch (error) {
        document.getElementById("param_" + key).innerHTML = "##.##";
      }
    }
   }
  });
}

function loadMeterValues(nick,id) {
  currentMeter = nick;
  currentMeterID = id;
  loadMeterValuesCall(nick);
}
var meterNames = []
var currentMeter = null;
var currentMeterID = 0;

var paramKeys = ["V1", "V2", "V3", "I1", "I2", "I3", "KWHI", "FREQ", "PFT", "VART", "VAT", "WT"];

function highlight_row() {
  var table = document.getElementById('meterTable');
  var cells = table.getElementsByTagName('td');

  for (var i = 0; i < cells.length; i++) {
      // Take each cell
      var cell = cells[i];
      // do something on onclick event for cell
      cell.onclick = function () {
          // Get the row id where the cell exists
          var rowId = this.parentNode.rowIndex;

          var rowsNotSelected = table.getElementsByTagName('tr');
          for (var row = 1; row < rowsNotSelected.length; row++) {
              rowsNotSelected[row].style.backgroundColor = "";
              rowsNotSelected[row].classList.remove('selected');
          }
          var rowSelected = table.getElementsByTagName('tr')[rowId];
          rowSelected.style.backgroundColor = "#6cb6df";
          rowSelected.className += " selected";

      }
  }
}


function init() {
  xproSendUserMessage("getMeterNames2","",function(meters){
    meterNames = meters.data.map((meter) => {
      return meter;
    });

    console.log(meters)
    console.log("meter page loaded");
    let mIndex = 1;
    for (let mt of meterNames) {
      document.getElementById("meterList").innerHTML += `<tr onclick="callall('${mt.Name}','${mt.HasLoadSwitch}','${mt.MeterID}')">
      <td>${mIndex}</td>
      <td>${mt.Name}</td>
      </tr>`;
      mIndex += 1;
    }
  })
    
highlight_row()
}

async function periodic() {
  setTimeout(() => {
    loadMeterValuesCall(currentMeter);
  }, 2000);
}

function destroy() {
  console.log("meter page destroyed");
}
