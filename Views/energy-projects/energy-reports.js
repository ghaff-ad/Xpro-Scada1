var periodButtons = document.getElementById("periodButtons");
var tableData = document.getElementById("tableData");
var spinnerDiv = document.getElementById("loading-spinner");
var meterMapping = {};
try {
  var energyReportsTable = $("#energy-report-table")["DataTable"]({
    initComplete: function () {
      $(this.api().table().container()).find('input[type="search"]').parent().wrap("<form>").parent().attr("autocomplete", "off").css("overflow", "hidden").css("margin", "auto");
    },
  });
} catch (error) {}

function numberWithCommas(x) {
  sprtd = x.toString().split(".");
  return sprtd[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + sprtd[1];
}

function loadMeterValuesCall(nick) {
  document.getElementById("meterName").innerHTML = nick;
  xproSendUserMessage("loadMeterValues", nick, function (data) {
    if (data == null) {
    } else {
    }
  });
}

function loadReport() {
  energyReportsTable["clear"]()["draw"]();
  repBtn = document.getElementById("loadReportButton").disabled = true;
  spinnerDiv.style.display = "block";
  let startDate = document.getElementById("report-start-date").value;
  let endDate = document.getElementById("report-end-date").value;
  let Meter_id = document.getElementById("reportMeterSelect").value;
  document.getElementById("meterNameLabel").innerHTML = meterMapping["m" + Meter_id]["Name"];
  if (Meter_id == "") {
    xproNotify("No Meter Selected", "", "warning");
  } else if (new Date(endDate).getTime() - new Date(startDate).getTime() > 1296000000) {
    xproNotify("Date Range too large", "", "warning");

    spinnerDiv.style.display = "none";
    repBtn = document.getElementById("loadReportButton").disabled = false;
  } else if (new Date(endDate).getTime() - new Date(startDate).getTime() < 0) {
    xproNotify("invalid time range", "", "warning");
    repBtn = document.getElementById("loadReportButton").disabled = false;
    spinnerDiv.style.display = "none";
  } else {
    xproSendUserMessage("getMeterDataLogs", { startDate, endDate, Meter_id }, function (data) {
      if (data.successFlag) {
        let ind = 1;
        energyReportsTable["clear"]()["draw"]();
        for (let dat of data.data) {
          energyReportsTable.row
            .add([new Date(dat.TransDate).toLocaleString(), format2dec(dat.V1), format2dec(dat.V2), format2dec(dat.V3), format2dec(dat.I1), format2dec(dat.I2), format2dec(dat.I3), format2dec(dat.WT), format2dec(dat.VART), format2dec(dat.VAT), format2dec(dat.PFT)])
            .draw(false);
          if (ind == data.data.length) {
            spinnerDiv.style.display = "none";
            repBtn = document.getElementById("loadReportButton").disabled = false;
          }
          ind += 1;
        }
      } else {
        spinnerDiv.style.display = "none";
        repBtn = document.getElementById("loadReportButton").disabled = false;
      }
    });
  }
}

function format2dec(val) {
  return parseInt(val * 100) / 100;
}

function init() {
  initData();
}
function initData() {
  document.getElementById("report-start-date").value = "01/01/2019";
  document.getElementById("report-end-date").value = "01/15/2019";

  setTimeout(() => {
    document.getElementById("report-start-date-provider").style.display = "table";
    document.getElementById("report-end-date-provider").style.display = "table";
    document.getElementById("reportMeterSelect").focus();
  }, 500);

  let mIndex = 1;
  xproSendUserMessage("getMeterNames", 1, function (data) {
    if (data.successFlag == true) {
      tagNames = data.data;
      document.getElementById("reportMeterSelect").value = tagNames[0].MeterID;
      for (let mt of tagNames) {
        meterMapping["m" + mt.MeterID] = mt;
        document.getElementById("reportMeterSelect").innerHTML += `
        
        <option value="${mt.MeterID}">${mt.Name}</option>`;
        mIndex += 1;
        if (mIndex == data.length) {
        }
      }
    } else {
      xproNotify("", "unable to load data", "warning");
    }
  });
}

async function periodic() {}

function destroy() {
  console.log("energy logs page destroyed");
}

function exportTableToExcel() {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  energyReportsTable["destroy"]();
  var tableSelect = document.getElementById("energy-report-table");
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
  let Meter_id = document.getElementById("reportMeterSelect").value;
  filename = meterMapping["m" + Meter_id]["Name"] + ".xls";

  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    downloadLink.href = "data:" + dataType + ", " + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
  }
  setTimeout(() => {
    try {
      var energyReportsTable = $("#energy-report-table")["DataTable"]({
        initComplete: function () {
          $(this.api().table().container()).find('input[type="search"]').parent().wrap("<form>").parent().attr("autocomplete", "off").css("overflow", "hidden").css("margin", "auto");
        },
      });
    } catch (error) {}
  }, 1000);
}
