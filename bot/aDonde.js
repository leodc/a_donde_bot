// var request = require('request');

var PAGE_ACCESS_TOKEN = "EAAW8CvCVE1ABAHElFZAyiRvs7x2Woj12OCpT7tZBNOnBIoZCOl95HUjnu48cX5K73yZBabUk4bzQCI9aVTEGUpKMB7QVNOLF1srQZBesFZAUkvwt15j1GJQVMssqxtZAcHAAVBDZAYTP8SDSmjDZB92EKcEm381ZB1PQZCDvIYWZBP0mZAQZDZD";
var PAGE_SIZE = 10;

// Handles messages events
function handleMessage(sender_psid, received_message) {
  var response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  var request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, function(err, res, body){
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}
