var express = require('express');
var router = express.Router();
var dondeBot = require('../bot/aDonde');
var winston = require('winston');


// Adds support for GET requests to our webhook
router.get('/', function(req, res){
  // Parse the query params
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === process.env.A_DONDE_VALIDATION_TOKEN) {
      // Responds with the challenge token from the request
      winston.info("Webhook verified correctly");
      res.status(200).send(challenge);
    } else {
      winston.error("Tokens do not match");
      res.sendStatus(403);
    }
  }
});


// Creates the endpoint for our webhook
router.post("/", function(req, res){
  var data = req.body;

  // Checks this is an event from a page subscription
  if (data.object == 'page') {

    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        winston.info({"message": messagingEvent});
        
        if (messagingEvent.message) {
          
          if(messagingEvent.message.quick_reply){
            dondeBot.handleQuickReply(messagingEvent);
          } else if(messagingEvent.message.text){
            dondeBot.receivedMessage(messagingEvent);
          }
          
        } else if (messagingEvent.postback) {
          dondeBot.receivedPostback(messagingEvent);
        } else {
          winston.warn({"Webhook received unknown messagingEvent": messagingEvent});
        }
      });
    });


    res.sendStatus(200);
  }
});

module.exports = router;
