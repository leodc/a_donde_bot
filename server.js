var express = require('express');
var bodyParser = require('body-parser');
// var crypto = require('crypto');


// App setup
var app = express();
app.set('port', process.env.PORT || 8888);
app.use(bodyParser.json());

// routers
var webhookRouter = require("./routers/webhook");

app.use("/webhook", webhookRouter);


// Start
app.listen(app.get('port'), function() {
  console.log('Bot is running on port', app.get('port'));
});
