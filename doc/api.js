
// LIST OF FUNCTIONS AVAILABLE IN USER PROGRAMS AND MODULES
writeTag(name, value, is_address)
readTag(name, is_address, dynamic)
readTagI(name, is_address)
sendSMS(message, phone_numbers)
sendEmail(to, subject, message_text, message_html, attachments)
triggerServerUpload(server_name, log_flag, upload_format)
writeGlobalRegister(name, value)
readGlobalRegister(name)
deleteGlobalRegister(name)
getServerDateTime()
getSiteInfo()
miscResource()
enoxecuteUserModuleFunction(module_name, function_name, parameters)
mqttPublish(connection_name, topic, message, qos, retain, duplicate)
sleep(ms)
delay(ms)
uiSendUserMessage(messageid, msg, callback, socket);
uiSubscribeUserMessage (messageid, callback);
uiUnsubscribeUserMessage (messageid, callback);
uiNotify (title, msg, type, align, icon, icon_type, delay)



// WRITING TO TAGS
writeTag(name, value, is_address)
// Writes to the specified tag
// name: name or address of the tag
// value: value to be written
// is_address: true if the name is an address
// Returns the written value if successful, else false
let write_ok = await writeTag("DO1", 1)
let write_ok = await writeTag("DO1", 1, false)
let write_ok = await writeTag("H:0@CONN", 1, true)



//READING FROM TAGS
readTag(name, is_address, immediate)
// Reads the value of the specified tag
// name: name or address of the tag
// is_address: true if the name is an address
// immediate: true is the tag should be read from source instead of cached value
// Returns the read value or false if it fails
let value = await readTag("DI0")
let value = await readTag("H:0@CONN", true)
let value = await readTag("DI0", false, true)
let value = await readTag("H:0@CONN", true, true)



readTagI(name, is_address)
// Reads the value of the specified tag from source instead of cached
// name: name or address of the tag
// is_address: true if the name is an address
// Returns the read value or false if it fails
let value = await readTagI("DI0")
let value = await readTagI("H:0@CONN", true)



// SENDING SMS
sendSMS(message, phone_numbers)
// Sends an SMS to the specified phone numbers
// message: message to be sent
// phone_numbers: phone numbers separated by commas
// Returns true if successful, else false
let send_ok = await sendSMS("Hello X-Pro", "+233201234567,+233241234567")



//SENDING EMAILS
sendEmail(to, subject, message_text, message_html, attachments)
// Sends an email to the specified email addresses
// to: reciepients separated by commas
// subject: subject of the email
// message_text: email body in text format
// message_html: email body in html format
// attachments: list of attachments - check details below.
// Returns true if successful, else false
// attachments format

let send_ok = await sendEmail(
	"xpro@automationghana.com,xyenet@automationghana.com",
	"Test Email from X-Pro",
	"Hello Team, This is my test message",
	"<b>Hello Team</b>, This is my test message"
	)


let send_ok = await sendEmail(
	"xpro@automationghana.com,xyenet@automationghana.com",
	"Test Email from X-Pro",
	"Hello Team, This is my test message",
	"<b>Hello Team</b>, This is my test message",
	[
		{
	        filename: 'attachment1.txt',
	        content: 'This is the content of the attachment 1'
	    },
	    {
	        filename: 'attachment2.txt',
	        content: 'This is the content of the attachment 2'
	    }

    ]
	)



// SERVER UPLOADS
triggerServerUpload(server_name, log_flag, upload_format)
// Triggers the specified server configuration name to upload data
// server_name: the name of the server configuration
// log_flag: the value of the log flag to use.
// upload_format: format for data upload. specify to override default
// Returns true if successful, else false
let upload_ok = await triggerServerUpload("xyenet", 1)
let upload_ok = await triggerServerUpload("xyenet", 1, "data:sid={{SITE_ID}},tm={{TIMESTAMP}},log={{LOG_ID}},DI0={{DI0}})")



// GLOBAL REGISTERS
// Global registers are shared between all user programs
writeGlobalRegister(name, value)
// Writes to a global register
// name: name of the register
// value: value to be written
// Returns the written value if successful, else false
let write_ok = await writeGlobalRegister("water_level", 68)

readGlobalRegister(name)
// Reads from a global register
// name: name of the register
// Returns the read value or null if it fails
let water_level = await readGlobalRegister("water_level")

deleteGlobalRegister(name)
// Deletes the specified global register
// name: name of the register
// Returns true if successful, else false
let delete_ok = await deleteGlobalRegister("water_level")



// SERVER DATE AND TIME
getServerDateTime()
// Returns the server date and time information
/* {
        'datetime': '01-Jan-2018 13:01:01',
        'day': 1,
        'month': 1,
        'year': 2018,
        'hours': 13,
        'minutes': 1,
        'seconds': 1,
        'month_name_short': 'Jan',
        'month_name_full': 'January',
    }
*/

let date_time_info = getServerDateTime()



// SITE INFORMATION
getSiteInfo()
// Returns the site name and id
/*
	{
		"site_name": "XyeNode",
		"site_id": 100
	}
*/
let site_info = getSiteInfo()



// MISC RESOURCES
miscResource()
// Returns resources for convinience
/*
{
    "app_folder": "path/to/main/app/folder",
    "temp_folder": "path/to/a/temp/folder",
    "programs_folder": "path/to/user/programs/folder",
    "fs": fs_object,
    "path": path_object,
    "promise": promis_object,
    "events": xpro_events_emitter,
    "xlsx": excel_object,
    "crypto": crypto_object,
    "etc": more_to_come
}
*/
let temp_folder = miscResource().temp_folder
let promise = miscResource().promise
let excel_lib = miscResource().xlsx
let programs_folder = miscResource().programs_folder

let xpro_events = miscResource().events
xpro_events.on("email_received", function(data){
	//process email here
	//data contains: draft
	{
		"from": "from@email.com",
		"subject": "subject",
		"message": "message here",
		"cmd_info": {
			"pwd_level": 1,
			"command": "GET_SITE_DATA",
			"parameters": ["100", "01-Jan-2018", "30-Jan-2018"]

		}
	}
})




// EXECUTE USER FUNCTIONS
executeUserModuleFunction(module_name, function_name, parameters)
// Executes a function in a user module
// module_name: the name of the user modules (excluding .xpro.js)
// function_name: the name of the exported function
// parameters: the parameters to pass to the function
// Returns the returned value of the function
// NOTE: An exception will be thrown if an error occurs. You must always handle the promise rejection
let return_value = await executeUserModuleFunction("Module1", "Function1", 20 );
let return_value = await executeUserModuleFunction("Module1", "Function1", {val: 20, dp: 2} );



// PUBLISH AN MQTT MESSAGE
mqttPublish(connection_name, topic, message, qos, retain, duplicate)
// Publishes an MQTT message
// connection_name: the name of the MQTT connection defined in the project
// topic: the topic to publish
// message: the message to publish
// qos: the qos to publish
// retain: the retain flag to publish
// duplicate: the duplicate flag to publish
// Returns true if successful, else false



// DELAYING EXECUTION
sleep(ms)
delay(ms)
// Delays execution for the specified milliseconds

await sleep(1000)
await delay(1000)




//UI FUNCTIONS
//************

// SENDING DATA TO FRONTEND
uiSendUserMessage(messageid, msg, callback, socket);
// Sends a message to the frontend - to a specific client or broadcasts to all clients
// messageid: the id of the message
// msg: the data to be sent
// callback: an optional callback function. this function must be called by the frontend user program
// socket: an optional client socket
// NOTE:
// 1. if socket is omitted the message is sent to all clients
// 2. callback are not supported for broadcast messages
// 3. see the subscribeUserMessage function for information on how to obtain the specific client socket object

uiSendUserMessage("broadcast", {"info": "some information", "extra_info" : 20});
uiSendUserMessage("clientmessage", {"info": "some information", "extra_info" : 20}, null, socket);
uiSendUserMessage("withcallback", {"request": "do something", "extra_info" : 20}, function (data) {
    console.log("response: " + data)
}, socket);




// SUBSCRIBE TO A USER MESSAGE
uiSubscribeUserMessage (messageid, callback);
// Subscribes to a user message
// messageid: the id of the message
// callback: the function to be called when the message is received
//NOTE: the callback always receives two parameters.
// 1. the data is in the format {msg: data, callback: callback, socket: socket}
// 2. the socket points to the client that sent the message. you can pass that to the uiSendUserMessage function to respond to that client only



uiSubscribeUserMessage ("mymessage", function (data) {
    console.log("user message data: " + data.msg)

    uiSendUserMessage("clientmessage", {"info": "some information", "extra_info" : 20}, null, data.socket);
});

uiSubscribeUserMessage ("mymessage", function (data) {
    console.log("user message data: " + data.msg)
    if (data.callback){
        data.callback("your data here");
    }
});

function myMessage(data) {
    console.log("user message data: " + data.msg)
    if (data.callback){
        data.callback("your data here");
    }
}
uiSubscribeUserMessage ("mymessage", myMessage);




// UNSUBSCRIBE A USER MESSAGE
uiUnsubscribeUserMessage (messageid, callback);
// Unsubscribes a user message
// messageid: the id of the message
// callback: the name of the callback function.
//NOTE: to unsubscribe always use a named function

uiUnsubscribeUserMessage ("mymessage", myMessage);




// SENDING NOTIFICATIONS
uiNotify (title, msg, type, align, icon, icon_type, delay)
// Sends a notification to the ui.
// title: the message title
// msg: the message body
// type: the message type: xpro-default, xpro-info, xpro-warning, xpro-danger, xpro-icon-default, xpro-icon-info, xpro-icon-warning, xpro-icon-danger
// align: the horizontal alignment: left, center, right. default is center
// icon: the icon. use font icons or url to images.
// icon_type: the type of icon: class, image. default is class
// delay: the delay before dismissal in ms. default is 2000ms

uiNotify("Hello", "This is my message");
uiNotify("Hello", "This is my message", "xpro-warning");
uiNotify("Hello", "This is my message", "xpro-warning", "right");
uiNotify("Hello", "This is my message", null, "right");
uiNotify("Hello", "This is my message", "xpro-icon-default", "right", "fa fa-user");
uiNotify("Hello", "This is my message", "xpro-icon-default", "center", "path/to/my/image.jpg", "image");
uiNotify("Hello", "This is my message", "xpro-icon-default", "center", "fa fa-user");
