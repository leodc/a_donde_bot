// var request = require('request');

var PAGE_ACCESS_TOKEN = "EAAW8CvCVE1ABAHElFZAyiRvs7x2Woj12OCpT7tZBNOnBIoZCOl95HUjnu48cX5K73yZBabUk4bzQCI9aVTEGUpKMB7QVNOLF1srQZBesFZAUkvwt15j1GJQVMssqxtZAcHAAVBDZAYTP8SDSmjDZB92EKcEm381ZB1PQZCDvIYWZBP0mZAQZDZD";
var PAGE_SIZE = 10;


function receivedPostback(event) {
    var senderID = event.sender.id;

    var payload = event.postback.payload;

    console.log(payload)

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

    console.log(message);

    // You may get a text or attachment but not both
    // var messageAttachments = message.attachments;
    // var messageText = message.text;
    //
    // console.log("message", message);
    //
    // if(messageAttachments){
    //
    //     console.log("messageAttachments", messageAttachments);
    //
    //     for( var i = 0; i < messageAttachments.length; i++){
    //         console.log(messageAttachments[i].payload);
    //
    //         switch( messageAttachments[i].type ){
    //             case "image":
    //                 if( messageAttachments[i].payload.sticker_id === 369239263222822 ){
    //                     sayHi(senderID);
    //                 }
    //                 break;
    //
    //             case "location":
    //                 handleLocation(senderID, messageAttachments[i]);
    //                 break;
    //         }
    //     }
    //
    // } else if (messageText) {
    //     console.log("messageText", messageText);
    //     sayHi(senderID);
    // }
}


module.exports = {
    receivedPostback: receivedPostback,
    receivedMessage: receivedMessage
};
