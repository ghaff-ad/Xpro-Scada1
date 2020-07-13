

// SET THE TEXT VALUE OF AN OBJECT
xproSetText(id,value)
// id: the id of the object.
// value: the value to set

xproSetText("temperature", "22.3")


// SET THE VISIBILITY OF AN OBJECT

xproSetVisibleOff(id)
xproSetVisibleOn(id)
xproSetVisible(id, state)

// id: the id of the object
// state: true for visible and false for invisible

xproSetVisibleOff("ack_button")
xproSetVisibleOn("ack_button")
xproSetVisible("ack_button", true)
xproSetVisible("ack_button", false)





// GET SITE INFORMATION
xproGetServerSiteInfo()
// Returns  {"site_name": "sitename","site_id": id}

var site_name = xproGetServerSiteInfo().site_name;
var site_id = xproGetServerSiteInfo().site_id;




// GET SERVER DATE AND TIME INFORMATION
xproGetServerDateTime()
// Returns
/*

{
    'datetime': 'datetime. eg 01-Jan-2019 11:15:00',
    'day': day,
    'month': month,
    'year': year,
    'hours': 24_hours,
    'minutes': minutes,
    'seconds': seconds,
    'month_name_short': 'month short name. eg Jan',
    'month_name_full': 'month full name. eg. January',
}

*/
var server_datetime = xproGetServerDateTime().datetime;


// GET MISC INFORMATION
xproGetClientMisc()
// Returns
/*

{
    'flash': {
            "flash0_5s": 0,
            "flash1s": 0,
            }
}

 */
var flash0_5s = xproGetClientMisc().flash.flash0_5s;
var flash1s = xproGetClientMisc().flash.flash1s;


// FLASH BITS

// __flash1s    : this is a 1 second flashing bit
// __flash0_5s  : this is a 0.5 second flashing bit

//eg __flash1s|ui@script



// SENDING DATA TO BACKEND (USER PROGRAM, USER MODULE, NODE-RED
xproSendUserMessage(messageid, msg, callback);
// Sends a message to the backend
// messageid: the id of the message
// msg: the data to be sent
// callback: an optional callback function. this function must be called by the user program

xproSendUserMessage("nocallback", {"request": "do something", "extra_info" : 20});
xproSendUserMessage("withcallback", {"request": "do something", "extra_info" : 20}, function (data) {
    console.log("response: " + data)
});




// SUBSCRIBE TO A USER MESSAGE
xproSubscribeUserMessage (messageid, callback);
// Subscribes to a user message
// messageid: the id of the message
// callback: the function to be called when the message is received
//NOTE: the callback always receives two parameters.
// 1. the first parameter is the message object
// 2. the second parameter is the user data received with the message
// 3. the data is in the format {msg: data, callback: callback}

xproSubscribeUserMessage ("mymessage", function (obj, data) {
    console.log("user message data: " + data.msg)
    if (data.callback){
        data.callback("your data here");
    }
});

function myMessage(obj, data) {
    console.log("user message data: " + data.msg)
    if (data.callback){
        data.callback("your data here");
    }
}
xproSubscribeUserMessage ("mymessage", myMessage);




// UNSUBSCRIBE A USER MESSAGE
xproUnsubscribeUserMessage (messageid, callback);
// Unsubscribes a user message
// messageid: the id of the message
// callback: the name of the callback function.
// NOTE: to unsubscribe always use a named function

xproUnsubscribeUserMessage ("mymessage", myMessage);


// SENDING NOTIFICATIONS
xproNotify (title, msg, type, align, icon, icon_type, delay)
// Sends a notification to the ui.
// title: the message title
// msg: the message body
// type: the message type: xpro-default, xpro-info, xpro-warning, xpro-danger, xpro-icon-default, xpro-icon-info, xpro-icon-warning, xpro-icon-danger
// align: the horizontal alignment: left, center, right. default is center
// icon: the icon. use font icons or url to images.
// icon_type: the type of icon: class, image. default is class
// delay: the delay before dismissal in ms. default is 2000ms

xproNotify("Hello", "This is my message");
xproNotify("Hello", "This is my message", "xpro-warning");
xproNotify("Hello", "This is my message", "xpro-warning", "right");
xproNotify("Hello", "This is my message", null, "right");
xproNotify("Hello", "This is my message", "xpro-icon-default", "right", "fa fa-user");
xproNotify("Hello", "This is my message", "xpro-icon-default", "center", "path/to/my/image.jpg", "image");
xproNotify("Hello", "This is my message", "xpro-icon-default", "center", "fa fa-user");



// LOADING DISPLAYS
xproLoadDisplay(name, view_type, ignore_view_history);

// Loads a display
// name: the name of the display
// For projects use the name of the display
// For custom views use the name specified in the menus.json file

// view_type: the type of display. defaults to svg
// Possible values are svg, html, svg_user, html_user
// svg: displays in a project
// html: default html views such as users, alarms and system monitor
// svg_user: user managed svg views
// html_user: user managed html views

// ignore_view_history: if set to true, the loaded display will not be added to the navigation history

xproLoadDisplay("menu");
xproLoadDisplay("flood sensors");
xproLoadDisplay("alarms", "html");
xproLoadDisplay("lights", "svg");
xproLoadDisplay("user svg view", "svg_user");
xproLoadDisplay("user html view", "html_user");
xproLoadDisplay("user html view", "html_user", true);



// EXECUTING SERVER SCRIPTS FROM THE CLIENT SIDE

xproExecuteServerScript(script, callback)

// Executes a server script from the client side.
// script: valid server script to be executed
// callback: optional callback function after the script is executed. it receives one parameter - result of execution

// NOTE:
// the script must be an expression. For complete code use xproExecuteServerScriptEx
// the function works only if the option "enable_client_execute_server_script" is set to true in the config.json file

xproExecuteServerScript('await readGlobalRegister("level2") / 100', function (data) {
    console.log("server result: Expression Result = " + data);
});
xproExecuteServerScript('await writeTag(\'H:35078@XPRO42",1,true) / 100', function (data) {
    console.log("server result: Expression Result = " + data);
});


xproExecuteServerScriptEx(script, callback)

// Executes a server script from the client side.
// script: valid server script to be executed
// callback: optional callback function after the script is executed. it receives one parameter - result of execution

// NOTE
// the function works only if the option "enable_client_execute_server_script" is set to true in the config.json file

xproExecuteServerScriptEx('let a = 20; return await readGlobalRegister("level2") / 100 + a;', function (data) {
    console.log("server result: Code Result = " + data);
});




// SHOW LOADING ANIMATION
xproLoadingStatus(show)

// Shows the loading animation (spinner)
xproLoadingStatus(true); //shows the animation
xproLoadingStatus(false); //hides the animation
