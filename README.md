# MST Gym Notifications

Checks the MST Gym google sheet every 30 minuites to see if there is fewer than 35 people in the gym.
Sends a push message onto this [channel](https://www.pushbullet.com/channel) if there is any update.

Can also be configured to read off any google spreadsheet and push to any channel

Requires a config.json file with the following format
```json
{
  "pushbulletApi": "API HERE",
  "googleApi": "API HERE",
  "cell": "B11",
  "timezone": "America/Chicago",
  "spreadsheet": "tA8NerswljZvsnzu5hIZHRg",
  "maxPeople": 35,
  "channelName": "mstgym",
  "message": {
    "title": "Get to the GYM"
  },
  "time": {
    "max": 21,
    "min": 6
  }
}
```
