/**     A  S I M P L E   T W I T T E R   B O T           **/
/**     =======================================          **/
/**     Written by Amit Agarwal @labnol on 03/08/2013    **/
/**     Tutorial link: http://www.labnol.org/?p=27902    **/
/**     Live demo at http://twitter.com/DearAssistant    **/

function start() {
  // REPLACE THESE DUMMY VALUES
  var TWITTER_CONSUMER_KEY     = "XXXX"; // No peeking!
  var TWITTER_CONSUMER_SECRET  = "YYYY"; // No peeking!
  var TWITTER_HANDLE           = "JQHerald";
  
  // DO NOT CHANGE ANYTHING BELOW THIS LINE
  // Store variables
  ScriptProperties.setProperty("TWITTER_CONSUMER_KEY",    TWITTER_CONSUMER_KEY);
  ScriptProperties.setProperty("TWITTER_CONSUMER_SECRET", TWITTER_CONSUMER_SECRET);
  ScriptProperties.setProperty("TWITTER_HANDLE",          TWITTER_HANDLE);
  ScriptProperties.setProperty("MAX_TWITTER_ID",          0);
    
  // Delete exiting triggers, if any
  var triggers = ScriptApp.getScriptTriggers();
  
  for(var i=0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
    
  // Setup trigger to read Tweets every five minutes
  ScriptApp.newTrigger("fetchEvents")
           .timeBased()
           .everyMinutes(1)
           .create();
}

function oAuth() {
  var oauthConfig = UrlFetchApp.addOAuthService("twitter");
  oauthConfig.setAccessTokenUrl("https://api.twitter.com/oauth/access_token");
  oauthConfig.setRequestTokenUrl("https://api.twitter.com/oauth/request_token");
  oauthConfig.setAuthorizationUrl("https://api.twitter.com/oauth/authorize");
  oauthConfig.setConsumerKey(ScriptProperties.getProperty("TWITTER_CONSUMER_KEY"));
  oauthConfig.setConsumerSecret(ScriptProperties.getProperty("TWITTER_CONSUMER_SECRET"));
}

/*function fetchTweets() {
  oAuth();
  
  var twitter_handle = ScriptProperties.getProperty("TWITTER_HANDLE");
  
  var phrase = "lang:en+to:" + twitter_handle; // English languate tweets sent to @labnol
  var search = "https://api.twitter.com/1.1/search/tweets.json?count=5&include_entities=false&result_type=recent&q="; 
  search = search + encodeString(phrase) + "&since_id=" + ScriptProperties.getProperty("MAX_TWITTER_ID");    
      
  var options =
  {
    "method": "get",
    "oAuthServiceName":"twitter",
    "oAuthUseToken":"always"
  };
  
  try {
    var result = UrlFetchApp.fetch(search, options);    

    if (result.getResponseCode() === 200) {
      var data = Utilities.jsonParse(result.getContentText());
      
      if (data) {
        var tweets = data.statuses;
        
        for (var i=tweets.length-1; i>=0; i--) {
          var question = tweets[i].text.replace(new RegExp("\@" + twitter_handle, "ig"), "");
          var answer   = askWolframAlpha(question);
          sendTweet(tweets[i].user.screen_name, tweets[i].id_str, answer);          
        }
      }
    }
  } catch (e) {
    Logger.log(e.toString());
  }
}*/

function sendTweet(tweet) {
  var options =
  {
    "method": "POST",
    "oAuthServiceName":"twitter",
    "oAuthUseToken":"always"    
  };
  
  var status = "https://api.twitter.com/1.1/statuses/update.json";
  
  status = status + "?status=" + encodeString(tweet);
  
  try {
    var result = UrlFetchApp.fetch(status, options);
    Logger.log(result.getContentText());    
  } catch (e) {
    Logger.log(e.toString());
  }
}

// Thank you +Martin Hawksey - you are awesome

function encodeString (q) {
   var str =  encodeURIComponent(q);
   str = str.replace(/!/g,'%21');
   str = str.replace(/\*/g,'%2A');
   str = str.replace(/\(/g,'%28');
   str = str.replace(/\)/g,'%29');
   str = str.replace(/'/g,'%27');
   return str;
}
