var request = require('request');
var winston = require('winston');
var foursquare = require("./foursquare");

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

    var attachments = messageAttachments[0];

    switch( attachments.type ){
      case "image":
        if( attachments.payload.sticker_id === 369239263222822 ){
          sayHello(senderID);
        }
        break;

      case "location":
        var latLng = {
          lat: attachments.payload.coordinates.lat,
          lng: attachments.payload.coordinates.long
        };

        foursquare.explore(latLng, 0, "none", function (error, body) {
          if(error){
            winston.error({"Error exploring foursquare": error});
            return;
          }

          winston.info(body);
        });
        
        break;
    }

  } else if (messageText) {
    winston.info({"messageText": messageText});
    sayHello(senderID);
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

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.A_DONDE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if(error || response.statusCode !== 200){
      winston.error({"Unable to send message": error, "status": response.statusCode, "body": body});
    }
  });
}


function sayHello(senderID){
  sendTextMessage(senderID, "¡ Hola ! yo te puedo ayudar a encontrar lugares de interes cercanos a ti, perfectos para llegar en bicicleta o caminando :)");

  setTimeout(function(){
    sendTextMessage(senderID, "Para iniciar solo comparte tu ubicación conmigo :) !");
  }, 100);
}


module.exports = {
  receivedPostback: receivedPostback,
  receivedMessage: receivedMessage
};
