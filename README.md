
![S&T Gym Notifications](https://i.imgur.com/weof0VV.png)

---
# Table of Contents
- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [Usage](#usage)

# Problem
The gym here at S&T can get quite busy and be almost impossible to work out in. Fortunately, there have a [website](https://sites.google.com/a/mst.edu/src-mobile-site/home/live-stats) that shows live stats from the gym. Unfortunately, this website is not the most user-friendly and it requires me to check it every time before I think about going.

# Solution
Instead of me having to check every time, this script will notify me on my phone when the number of people in the gym is below 35. It will read the data from the google spreadsheet with the live stats and when the condition is met, a push notification is sent via a custom channel on pushbullet. 

# Features
- Checks the MST Gym google sheet every x minutes
- Checks to see if there are fewer than x people in the gym.

# Usage
1. Install dependencies
```bash
npm install
```
2. Create a `config.json` file as specified here
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
3. Start the server
```
node gymNotifier.js
```
