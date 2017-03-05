var https = require('https');
var request = require('request');
var moment = require('moment-timezone');

var gymCount = 0;
var time = moment().tz("America/Chicago");

var checkForPeople = function() {
  https.get({
    hostname: 'sheets.googleapis.com',
    port: 443,
    path: '/v4/spreadsheets/tA8NerswljZvsnzu5hIZHRg/values/B11?key=AIzaSyC9SFuRFmL6uEvUiW3J7hVfG7qqAD0wFyk',
    agent: false
  }, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      let parsedData = JSON.parse(rawData);
      gymCount = parsedData['values'][0][0];
      if (gymCount <= 35 && time > 6 && time < 21) {
        request({
          method: 'POST',
          uri: 'https://api.pushbullet.com/v2/pushes',
          headers: {
            'Access-Token': 'o.NgVnRz2GT98lrMIJyk6SdKlBV4WdVZyV',
          },
          body: {
            "body": "GYM GYM GYm",
            "title": "Get to the GYM",
            "type": "note",
            "channel_tag": "mstgym"
          },
          json: true
        }, function callBack(err, httpResponse, body) {
          console.log(body);
        })
      }
      console.log(parsedData['values'][0][0]);
    })
  })
}

checkForPeople();
// setInterval(checkForPeople, 30 * 60 * 1000);
