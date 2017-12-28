var winston = require('winston');
var request = require('request');

var PAGE_SIZE = 10;


function receivedPostback(event) {
  // var senderID = event.sender.id;
  // var payload = event.postback.payload;

  winston.info(event);

  // if( payload.includes("payload_explore_more_") ){
  //     var data = payload.split("payload_explore_more_")[1].split(",");
  //
  //     var offset = data[0];
  //     var lat = data[1];
  //     var lng = data[2];
  //     var query = data[3];
  //
  //     if( isNaN(offset) || isNaN(lat) || isNaN(lng) ){
  //         //error
  //         sendErrorMessage(senderID);
  //         console.error("Error getting params for foursquare", offset, lat, lng);
  //         return -1;
  //     }
  //
  //
  //     exploreFoursquare(senderID, null, {lat: lat, lng:lng}, Number(offset), query);
  // }else if(payload === "payload_start"){
  //     sayHi(senderID);
  // }
}


function receivedMessage(event) {
  var senderID = event.sender.id;
  var message = event.message;

  // You may get a text or attachment but not both
  var messageAttachments = message.attachments;
  var messageText = message.text;

  if(messageAttachments){
    winston.info({"messageAttachments": messageAttachments});

    for( var i = 0; i < messageAttachments.length; i++){
      switch( messageAttachments[i].type ){
        case "image":
        if( messageAttachments[i].payload.sticker_id === 369239263222822 ){
          sayHi(senderID);
        }
        break;

        case "location":
        handleLocation(senderID, messageAttachments[i]);
        break;
      }
    }

  } else if (messageText) {
    winston.info({"messageText": messageText});

    sendTextMessage(senderID, "Hola ! yo te puedo ayudar a encontrar lugares cercanos a ti, perfectos para llegar en bicicleta o caminando :) !");
  }
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendAPI(messageData);
}


// function sendMessage(senderID, message){
//
//   // get username
//   request({
//     uri: 'https://graph.facebook.com/v2.6/' + senderID + '?access_token=' + process.env.A_DONDE_VALIDATION_TOCKEN,
//     method: 'GET',
//   }, function(error, response, data){
//     var name = error ? ":)":JSON.parse(data)["first_name"];
//
//     sendTextMessage(senderID, "Hola " + name + "! yo te puedo ayudar a encontrar lugares cercanos a ti, perfectos para llegar en bicicleta o caminando.");
//
//     var messageData = {
//       recipient: {
//         id: senderID
//       },
//       message: {
//         text: "Para empezar solo necesito que me compartas tu ubicación :).",
//         quick_replies: [
//           {
//             "content_type":"location"
//           }
//         ]
//       }
//     };
//
//     callSendAPI(messageData);
//   });
//
// }


function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.A_DONDE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //var recipientId = body.recipient_id;
      //var messageId = body.message_id;
      winston.info("Message send correctly");
    } else {
      winston.error({"Unable to send message": error, "status": response.statusCode, "body": body});
    }
  });
}


module.exports = {
  receivedPostback: receivedPostback,
  receivedMessage: receivedMessage
};
