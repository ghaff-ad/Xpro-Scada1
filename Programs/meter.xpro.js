const programs_folder = miscResource().programs_folder;
const path = miscResource().path;

function loop_interval() {
  return 3000;
}

async function setup() {
  uiSubscribeUserMessage("loadMeterValues", async function(data) {
    let retObj = await _GetMeterInfo(data.msg);
    data.callback(retObj);
  });
  uiSubscribeUserMessage("getMeterNames", async function(data) {
    let retObj = await mssql.query("select * from meters where ac")
    data.callback(retObj);
  });
}

async function loop() {}