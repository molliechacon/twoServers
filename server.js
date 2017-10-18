// Instructions

// - Using the previous example as a guide, create an app that has two web servers.
// - One that listens on port 7000 and one that listens on port 7500.
// - The one listening on port 7000 will always tell the user something good about themselves.
// - The one listening on 7500 will always tell the user something bad about themselves.
// - Make sure you create a Github repo and commit this code!

// Bonus

// - Look for other ways to expand what your server can do. As possibilities:
//   - Generate the good/bad phrase randomly from a list of predefined phrases
//   - Use the twitter package inside the response to also return a random tweet

var keys = require("./keys.js");

var twitter = require("twitter");
var http = require("http");

var PORTONE = 7000;
var PORTTWO = 7500;

function firstRequest(request, response) {
  response.end("You're doing a great job! Way to go!");
}

function secondRequest(request, response) {
  response.end("You're kinda dumb. Here's some tweets to read dummy.", "utf8",
  
  // callback! this prints to the console, not the browser. HOW TO FIX?? 
  function myTweets() {
    var params = {screen_name: "PearlMaferl"};
    var client = new twitter(keys);
  
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        console.log(" ");
        console.log("=============== My Tweets ==============");
        console.log(" ");
        for (i = 0; i < tweets.length; i++) {
          var twitterData = (tweets[i].created_at + "\n" + tweets[i].text + "\n");
          console.log(twitterData);
        }
      }
    })
  });
}

var serverOne = http.createServer(firstRequest);
var serverTwo = http.createServer(secondRequest);

serverOne.listen(PORTONE, function() {
  console.log("Server listening on: http://localhost:" + PORTONE);
});

serverTwo.listen(PORTTWO, function() {
  console.log("Server listening on: http://localhost:" + PORTTWO);
});




