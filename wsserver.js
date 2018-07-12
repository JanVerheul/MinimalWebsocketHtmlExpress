var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
app.ws('/socket', function(ws, req) {
    var counter = 0;
    setInterval(() => {
        counter += 1;
        ws.send('Server generated message #' + counter);
    }, 1000);
    ws.on('message', function(mes) {
        console.log('Message received from client: ' + mes);
    });
})
app.listen(6060, function() {
    console.log('WS server listening on port 6060...');
});