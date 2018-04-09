const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const port = 3000;

var options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
};

const app = express();

const server = https.createServer(options, app).listen(port, function () {
  console.log("Express server listening on port " + port);
});

app.use(express.static('./'));

