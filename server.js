// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isValidDate(dateString) {
  var ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(ISO_8601)) return false;  // Invalid format
  var d = new Date(dateString);
  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

app.get("/api/timestamp/:date_string?", function (req, res) {
  if(!req.params.date_string)
  {
    const date = new Date();
    res.send(200, {"unix": parseInt(date.getTime()), "utc": date.toUTCString() });
  }
  else
  {
    if (isValidDate(req.params.date_string)) {
      const date = new Date(req.params.date_string);
      res.send(200, {"unix": parseInt(date.getTime()), "utc": date.toUTCString() });
    }
    else
    {
      res.send(401, {"unix": null, "utc" : "Invalid Date" });
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});