var unitname = "";
CCU_PARAMS = {
  dig_status: [
    { name: "Indoor fan", index: "14" },

    { name: "Compressor 1", index: "15" },

    { name: "Compressor 2", index: "16" },

    { name: "E-heater 1", index: "17" },

    { name: "E-heater 2 (NO5)", index: "18" },

    { name: "Dehumidification (NO6)", index: "19" },

    { name: "Alarm output status (NO8)", index: "20" },

    { name: "Humidifier power (NO11)", index: "21" },

    { name: "Humidifier inlet valve(NO12)", index: "22" },

    { name: "Humidifier outlet valve (NO13)", index: "23" },

    { name: "Equipment status(ON/OFF)", index: "75" },

    { name: "Cooling mode", index: "76" },

    { name: "Heating mode", index: "77" },
  ],
  dig_settings: [
    { name: "Time on/off function", index: "58" },

    { name: "Set temperature", index: "59" },

    { name: "Set humidity", index: "60" },

    { name: "On/off with button key", index: "61" },

    { name: "Remote on/off", index: "62" },

    { name: "Administrator on/ off", index: "63" },

    { name: "Administrator reset alarm", index: "64" },
  ],
  an_status: [
    { name: "Ambient humidity", index: "0", unit: "%" },

    { name: "Pressure 1", index: "1", unit: "-" },

    { name: "Pressure 2", index: "2", unit: "-" },

    { name: "Ambient temperature", index: "3", unit: "°C" },

    { name: "Air outlet temperature", index: "4", unit: "°C" },

    { name: "Outdoor temperature", index: "5", unit: "°C" },

    { name: "Indoor fan motor control voltage", index: "21", unit: "V" },

    { name: "Humidifier control voltage", index: "22", unit: "V" },

    { name: "Outdoor fan motor1 control voltage", index: "23", unit: "V" },

    { name: "Outdoor fan motor2 control voltage", index: "24", unit: "V" },

    { name: "hour", index: "25", unit: "" },

    { name: "minute", index: "26", unit: "" },

    { name: "day", index: "27", unit: "" },

    { name: "month", index: "28", unit: "" },

    { name: "year", index: "29", unit: "" },

    { name: "week", index: "30", unit: "" },
  ],
  an_settings: [
    { name: "Setting temp.", index: "6", unit: "°C", min: "17.0", max: "40.0" },

    { name: "Minimum Setting temp", index: "7", unit: "°C", min: "17.0", max: "40.0" },

    { name: "Maximum Setting temp", index: "8", unit: "°C", min: "17.0", max: "40.0" },

    { name: "Setting Humidity", index: "9", unit: "%", min: "30.0", max: "70.0" },

    { name: "Minimum Setting Humidity", index: "10", unit: "%", min: "0.0", max: "100.0" },

    { name: "Maximum Setting Humidity", index: "11", unit: "%", min: "0.0", max: "100.0" },

    { name: "Temperature dead zone", index: "12", unit: "°C", min: "0.0", max: "20.0" },

    { name: "Cooling deviation", index: "13", unit: "°C", min: "0.0", max: "20.0" },

    { name: "Heating deviation", index: "14", unit: "°C", min: "0.0", max: "20.0" },

    { name: "Humidification deviation", index: "15", unit: "%", min: "0.0", max: "90.0" },

    { name: "Dehumidification deviation", index: "16", unit: "%", min: "0.0", max: "90.0" },

    { name: "Indoor high temp. alarm value", index: "17", unit: "°C", min: "0.0", max: "40.0" },

    { name: "Indoor low temp. alarm value", index: "18", unit: "°C", min: "0.0", max: "40.0" },

    { name: "High humidity alarm value", index: "19", unit: "%", min: "0.0", max: "100.0" },

    { name: "low humidity alarm value", index: "20", unit: "%", min: "0.0", max: "100.0" },
  ],
};
function loadParams() {
  loadAnalogSettings(CCU_PARAMS["an_settings"]);
  loadDigitalSettings(CCU_PARAMS["dig_settings"]);
  loadDigitalStatus(CCU_PARAMS["dig_status"]);
  loadAnalogStatus(CCU_PARAMS["an_status"]);
}
function getData() {
  xproSendUserMessage("ccu_data", {}, function (dat) {
    unitname = dat["unitname"];
    let data = dat["data"];
    console.log(dat, data);
    if (Object.keys(data).length > 0 && data["online"] == true) {
      xproNotify("", "Success", "xpro-success");
      for (let i = 0; i < data["dig"].length; i++) {
        try {
          document.getElementById("dig_status_" + i).innerHTML = data["dig"][i] == 1 ? "ON" : "OFF";
        } catch (error) {}
      }
      for (let i = 0; i < data["anl"].length; i++) {
        try {
          document.getElementById("an_status_" + i).innerHTML = Math.round(data["anl"][i] * 100) / 1000;
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      xproNotify("", "no data", "xpro-warning");
    }
  });
}
function init() {
  xproExecuteServerScriptEx(`return await readGlobalRegister("ccuindex");`, function (data) {
    
    document.getElementById("unitName").innerHTML =  ("CCU ") + (data!=null?data:'##');
  })
  loadParams();
  getData();

  xproLoadingStatus(true);
  setTimeout(() => {
    xproLoadingStatus(false);
  }, 5000);
}

async function periodic() {}

function destroy() {
  console.log("energy logs page destroyed");
}

function setDigitalValue(ind, value) {
  console.log(ind, value);
  xproExecuteServerScriptEx(`return await _SetXCDValue("${unitname}","MRW${ind}",${value});`, function (data) {
    if (data ===value) {
      document.getElementById("dig_status_" + ind).innerHTML = data == 1 ? "ON" : "OFF";

      xproNotify("", "Success", "xpro-success");
    } else {
      xproNotify("", "Something went wrong", "xpro-warning");
    }
    console.log("server result: Code Result = " + JSON.stringify(data));
  });
}

function setAnalogVal(ind, name) {
  val = document.getElementById("an_status_" + ind).innerHTML;
  var new_val = prompt("Enter new: " + name + "\nmin: " + CCU_PARAMS["an_settings"][ind]["min"] + "max: " + CCU_PARAMS["an_settings"][ind]["max"], val);

  if (new_val != null) {
    try {
      new_val = parseFloat(new_val);
      console.log(new_val, parseInt(CCU_PARAMS["an_settings"][ind]["min"]), parseInt(CCU_PARAMS["an_settings"][ind]["max"]));
      if (new_val >= 0 && new_val >= parseInt(CCU_PARAMS["an_settings"][ind]["min"]) && new_val <= parseInt(CCU_PARAMS["an_settings"][ind]["max"])) {
        xproExecuteServerScriptEx(`return await _SetXCDValue("${unitname}","WRW${ind}",${Math.round(new_val * 10)});`, function (data) {
          if (data == new_val) {
            document.getElementById("an_status_" + ind).innerHTML = new_val;
            xproNotify("", "Success", "xpro-success");
          } else {
            xproNotify("", "something went wrong", "xpro-warning");
          }
          console.log("server result: Code Result = " + JSON.stringify(data));
        });
      } else {
        xproNotify("invalid value", "min: " + CCU_PARAMS["an_settings"][ind]["min"] + "max: " + CCU_PARAMS["an_settings"][ind]["max"], "xpro-warning");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    xproNotify("invalid value", "min: " + CCU_PARAMS["an_settings"][ind]["min"] + "max: " + CCU_PARAMS["an_settings"][ind]["max"], "xpro-warning");
  }
}
function loadAnalogSettings(params) {
  for (let par of params) {
    document.getElementById("ccu-settings-analog").innerHTML += ` <div class="col-lg-3 col-sm-4 col-xs-6" style="border-left: 3px solid orange;margin-top: 2rem;">
    <div class="" style="margin-top: 1rem;">${par.name}</div>
    <div class="" style="margin-top: 1rem;border-bottom:1px solid black;"><span i id="an_status_${par.index}">N/A</span> ${par.unit}</div>
    <div class="" style="margin-top: 1rem;"><button
            class="btn btn-sm btn-success" onclick="setAnalogVal('${par.index}','${par.name}')">Set</button></div>
</div>`;
  }
}
function loadDigitalSettings(params) {
  for (let par of params) {
    document.getElementById("ccu-settings-digital").innerHTML += `<div class="col-lg-3 col-sm-4 col-xs-6" style="border-left: 3px solid orange;margin-top: 2rem;">
    <div style="margin-top: 1rem;">${par.name}</div>
    <div  style="margin-top: 1rem;"><span id="dig_status_${par.index}" style="border: 1px solid grey;border-radius: 5px;padding: 4px 15px;">OFFA</span> °C</div>
    <div class="row" style="margin-top: 1rem;margin-left: 0;">
        <button class="btn btn-sm btn-success" onclick="setDigitalValue(${par.index},1)">ON</button>
        <button class="btn btn-sm btn-danger" onclick="setDigitalValue(${par.index},0)">OFF</button>
        </div>
</div>`;
  }
}
function loadDigitalStatus(params) {
  for (let par of params) {
    document.getElementById("ccu-digital-status").innerHTML += `<div class="col-lg-3 col-sm-4 col-xs-6 ccu-status-col">
    <div>${par.name}</div>
<div id="dig_status_${par.index}" class="ccu-dig-status ccu-dig-status-on">N/A</div>
</div>`;
  }
}
function loadAnalogStatus(params) {
  for (let par of params) {
    document.getElementById("ccu-analog-status").innerHTML += `
    <div class="col-lg-3 col-sm-4 col-xs-6 ccu-status-col">
    <div style="margin-bottom:1rem">${par.name}</div>
    <div  style="border-bottom: 1px solid grey;padding: 4px 15px;"><span  id="an_status_${par.index}">N/A</span><span>
    ${par.unit}</span></div>
      
    </div>`;
  }
}
