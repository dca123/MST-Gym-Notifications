var https = require('https');
var request = require('request');
var moment = require('moment-timezone');
var config = require('./config.json');

var googleApi = config.googleApi;
var pushbulletApi = config.pushbulletApi;
var cell = config.cell;
var gymCount = 0;
var time;

var checkForPeople = function() {
  time = moment().tz(config.timezone).hour()
  if (time > config.time.min && time < config.time.max) {
    https.get({
      hostname: 'sheets.googleapis.com',
      port: 443,
      path: '/v4/spreadsheets/' + config.spreadsheet + '/values/' + cell + '?key=' + googleApi,
      agent: false
    }, (res) => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        let parsedData = JSON.parse(rawData);
        gymCount = parsedData['values'][0][0];
        if (gymCount <= config.maxPeople) {
          request({
            method: 'POST',
            uri: 'https://api.pushbullet.com/v2/pushes',
            headers: {
              'Access-Token': pushbulletApi,
            },
            body: {
              "body": "There are " + gymCount + " people at the gym !",
              "title": config.message.title,
              "type": "note",
              "channel_tag": config.channelName
            },
            json: true
          }, function callBack(err, httpResponse, body) {
            console.log("pushed message");
          })
        }
        console.log(parsedData['values'][0][0] " people in the gym");
      });
    });
  } else {
    console.log("Gym Closed")
  }
}

checkForPeople();
setInterval(checkForPeople, 30 * 60 * 1000);
