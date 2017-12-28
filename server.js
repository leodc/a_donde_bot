var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');


// App setup
var app = express();
app.set('port', process.env.PORT || 8888);
app.use(bodyParser.json({ verify: verifyRequestSignature }));

// routers
var webhookRouter = require("./routers/webhook");
app.use("/webhook", webhookRouter);


// Start
app.listen(app.get('port'), function() {
  console.log('Bot is running on port', app.get('port'));
});


// request validation
function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];

    if (!signature) {
        console.error("Couldn't validate the signature.");
    } else {
        // valid signature
        var elements = signature.split('=');
        //var method = elements[0];
        var signatureHash = elements[1];

        var expectedHash = crypto.createHmac('sha1', "d0626a34fc0ed819980955611dce97a3" ).update(buf).digest('hex');
        if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
}
