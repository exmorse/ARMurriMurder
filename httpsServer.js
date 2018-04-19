var express = require('express');
var https = require('https');
var fs = require('fs');
var path = require('path');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')
};

// Create a service (the app object is just a callback).
var app = express();

app.get('/', function (req, res) {
	console.log("Received GET from " + req.client.remoteAddress);
	
	//res.send("<h1>Hello</h1>");
	
	/*fs.readFile('test.html', function(err, data) {
		if (err) res.send("Error");
		else res.send(data.toString());
	});*/

	res.sendFile(path.join(__dirname + "/test.html"));
});

app.use(express.static(__dirname + '/'));

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(4430);
