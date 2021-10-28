const http = require('http');
//gather app
var requireApp = require('./app');

const port = 8080;

//Create a server
var server = http.createServer(requireApp);
server.listen(port, function() {
    console.log("listening on port 8080");
})
const startUpServerTimer = require("./controllers/timer.controller");
const startTimer = new startUpServerTimer()
startTimer.startFirstTimer()