const app_folder = miscResource().app_folder;
const path = miscResource().path;
const fs = miscResource().fs;
const config_path = path.join(app_folder, "./config/logConfig.json");
const log_path = path.join(app_folder, "./config/logs.json");
const sql = require('mssql')
var meterList = []
var logConfig = {};
var logObj = {};
var timeFlag = 0;

function loop_interval() {
  return 2000;
}
var ttt = {}
const config = {
    
    user: '',
    
    password: '',
    server: '', 
    database: ''
}

async function setup() {

  uiSubscribeUserMessage("controlMeter", async function (data) {

    let results = null
    try {
      await sql.connect(config);
      if (data.msg.state === true){
        results = await sql.query`update Meters set LoadSwitchCmd = 'True' where MeterID = ${data.msg.id}`;
        console.log(results)
      }
      else{
        results = await sql.query`update Meters set LoadSwitchCmd = 'False' where MeterID = ${data.msg.id}`;
        console.log(results)
      }
    }
    catch (error) {
      console.log("error updating load switch command")
    }
    let successval = results.rowsAffected[0]>0?true:false;
    data.callback({successFlag:successval});
  })
  subscribeMeterNames();
  subscribeLogTagValues();
  getMeterNames();
}

async function getMeterNames(){
  try {
    await sql.connect(config);
    let result = await sql.query`select MeterID,Name, HasLoadSwitch, LoadSwitchCmd from Meters where Active = 'true'`;
    meterList = result.recordset;
   
  } 
  catch (error) {
    console.log("error getting meter names")
  }

}


function subscribeMeterNames() {
  console.log("subsc")
  uiSubscribeUserMessage("getMeterNames2", async function (data) {
    let successval = meterList.length>0?true:false;
    data.callback({successFlag:successval,data:meterList,somethingElse:false});
    getMeterNames();
  });
}

function subscribeLogTagValues() {
  uiSubscribeUserMessage("getMeterDataLogs", async function (data) {
    try {
      console.log("fetch logs 1")
     console.log(`select * from scadaDataLogs where MeterID = ${data.msg.Meter_id} and TransDate > \'${data.msg.startDate}\' and TransDate < \'${data.msg.endDate}\' ORDER BY TransDate DESC`);
     let result = await sql.query(`select * from scadaDataLogs where MeterID = ${data.msg.Meter_id} and TransDate > \'${data.msg.startDate}\' and TransDate < \'${data.msg.endDate}\' ORDER BY TransDate DESC`);
      
     let meterData = result.recordset;
      console.log("fetch logs 2",result);
      data.callback({successFlag:true,data:meterData});
    } catch (err) {
      console.log("error getting meter logs");
      data.callback({successFlag:false});
    }
  });
}

async function loop() {
// console.log(ttt)
}

function getData(){}