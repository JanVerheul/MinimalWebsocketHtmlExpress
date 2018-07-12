var express = require('express');
var app = express();
app.get('/page.html', function(req, res) {
    res.send(`
<!DOCTYPE html>
<html>
    <head>
        <title>Websocket Bidirectional Communication</title>
    </head>
    <body>
        <h1>Value received via websocket connection</h1>
        <p id='pid1'></p>
        <h1>Value send via websocket connection</h1>
        <p id='pid2'></p>
        <script>
            const socket = new WebSocket('ws://localhost:6060/socket');
            // Connection opened
            socket.addEventListener('open', function (event) {
                console.log('Connection Opened ');
                let counter = 0
                setInterval(() => {
                    counter += 1;
                    const message = 'Client generated message #' + counter
                    socket.send(message);
                    document.getElementById('pid2').innerHTML = message;
                }, 1370);
            });
            // Listen for messages
            socket.addEventListener('message', function (event) {
                const message = event.data;
                console.log('Message from server ', message);
                document.getElementById('pid1').innerHTML = message;
            });
        </script>
    </body>
</html>`);
});
app.listen(5050, function() {
    console.log('HTTP server listening on port 5050...');
});