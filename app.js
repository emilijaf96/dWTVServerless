// You can find these values via the command
//     bx wsk action get --summary /[namespace]/[package]/create-document -v
// Look at the request headers in the verbose output.

// This is the value of the Authorization header.
const AUTH_HEADER = 'Basic NGRmMjg2YzItYTNjMC00ZmFkLTgwN2UtMDY0MzcyMjc4MzA4OmxpZ2ZpbFQwdDFUOUR5ZzRtcUJ2YXFrZG9lMjdaU1U4OUN2WFF1b0JkUmhUeWJ0RU1FN1BMcDZ1WWRzdW1IWnY=';

// This is the endpoint where the wsk tool sent your request to get
// the package details.
const URL = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/DougCo_dev/actions/Bluemix_dougdb_dougkey/create-document';

// 8080 may not be your favorite number, but Cloud Foundry insists on it.
const port = 8080;

// Use the common combination of Express, body-parser, and
// request to handle web traffic and requests.
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Create a new express server and set up the body-parser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML files out of ./public
app.use(express.static(__dirname + '/public'));

function owCallback(err, response, body) {
  console.log('Response = ' + response.statusCode);
 if (!err && (response.statusCode == 200 || response.statusCode == 202)) {
   console.log('Registration successfully processed!');
 } else {
   console.log('insert failed! ' + err);
 }
}

app.post('/openwhisk', function(req, res) {
  var options = {
    url: URL,
    body: {'dbname': 'webinar', 'doc': req.body},
    json: true,
    headers: {
      'Content-Type'  : 'application/json',
      'accept'        : 'application/json',
      'Authorization' : AUTH_HEADER
    }
  };
  request.post(options, owCallback);
  res.redirect("/registered.html");
});

// start server on the specified port
app.listen(port);
console.log(`Using node.js version ${process.version}`);
console.log(`Server started on port ${port} ...`);
