/**               Jade Quarry Herald Bot                 **/
/**     =======================================          **/
/**     Using starter code by Amit Agarwal @labnol       **/
/**     Tutorial link: http://www.labnol.org/?p=27902    **/
/**     Live demo at http://twitter.com/DearAssistant    **/

function set_constants() {
  var TWITTER_CONSUMER_KEY     = "7QhPFzt1ioanF3z53tRtA";
  var TWITTER_CONSUMER_SECRET  = "YYYY"; // No peeking!
  var WORLD_ID                 = 1008; // Jade Quarry - see https://api.guildwars2.com/v1/world_names.json
  var EVENT_REQUEST_URL        = "https://api.guildwars2.com/v1/events.json?world_id=" + WORLD_ID;
  var RELEVANT_EVENTS          = [
    // Tequatl
    { "id":"568A30CF-8512-462F-9D67-647D69BEFAED", "name":"Defeat Tequatl the Sunless." },
    
    // Jormag Meta Event Chain
    { "id":"96D736C4-D2C6-4392-982F-AC6B8EF3B1C8", "name":"Destroy the dragon crystal at Elder's Vale." },
    { "id":"429D6F3E-079C-4DE0-8F9D-8F75A222DB36", "name":"Destroy the dragon crystal at the Pact flak cannons." },
    { "id":"C957AD99-25E1-4DB0-9938-F54D9F23587B", "name":"Destroy the dragon crystal near the Pact siege wall." },
    { "id":"0CA3A7E3-5F66-4651-B0CB-C45D3F0CAD95", "name":"Destroy the dragon crystal on the road to Slough of Despond." },
    { "id":"BFD87D5B-6419-4637-AFC5-35357932AD2C", "name":"Lure out the Claws of Jormag by destroying the final dragon crystal." },
    { "id":"0464CB9E-1848-4AAA-BA31-4779A959DD71", "name":"Defeat the Claw of Jormag." },
    
    // The Shatterer Meta Event Chain
    { "id":"8E064416-64B5-4749-B9E2-31971AB41783", "name":"Escort the Sentinel squad to the Vigil camp in Lowland Burns." },
    { "id":"580A44EE-BAED-429A-B8BE-907A18E36189", "name":"Collect siege weapon pieces for Crusader Blackhorn." },
    { "id":"03BF176A-D59F-49CA-A311-39FC6F533F2F", "name":"Slay the Shatterer" },
    
    // "The Frozen Maw" Meta Event Chain
    { "id":"6F516B2C-BD87-41A9-9197-A209538BB9DF", "name":"Protect Tor the Tall's supplies from the grawl." },
    { "id":"D5F31E0B-E0E3-42E3-87EC-337B3037F437", "name":"Protect Scholar Brogun as he investigates the grawl tribe." },
    { "id":"6565EFD4-6E37-4C26-A3EA-F47B368C866D", "name":"Destroy the dragon totem." },
    { "id":"90B241F5-9E59-46E8-B608-2507F8810E00", "name":"Defeat the shaman's elite guard." },
    { "id":"DB83ABB7-E5FE-4ACB-8916-9876B87D300D", "name":"Defeat the Svanir shamans spreading the dragon's corruption." },
    { "id":"374FC8CB-7AB7-4381-AC71-14BFB30D3019", "name":"Destroy the corrupted portals summoning creatures from the mists." },
    { "id":"F7D9D427-5E54-4F12-977A-9809B23FBA99", "name":"Kill the Svanir shaman chief to break his control over the ice elemental." },
    
    // "Shadow Behemoth" Meta Event Chain
    { "id":"AFCF031A-F71D-4CEA-85E1-957179414B25", "name":"Drive back Underworld creatures by destroying portals in Taminn Foothills." },
    { "id":"E539A5E3-A33B-4D5F-AEED-197D2716F79B", "name":"Drive back Underworld creatures by destroying portals in the monastery." },
    { "id":"CFBC4A8C-2917-478A-9063-1A8B43CC8C38", "name":"Drive back Underworld creatures by destroying portals in the Heartwoods." },
    { "id":"36330140-7A61-4708-99EB-010B10420E39", "name":"Drive back Underworld creatures by destroying portals in the swamp." },
    { "id":"31CEBA08-E44D-472F-81B0-7143D73797F5", "name":"Defeat the shadow behemoth." },
    
    // "Fire Elemental" Meta Event Chain
    { "id":"5E4E9CD9-DD7C-49DB-8392-C99E1EF4E7DF", "name":"Escort the C.L.E.A.N. 5000 golem while it absorbs clouds of chaos magic." },
    { "id":"2C833C11-5CD5-4D96-A4CE-A74C04C9A278", "name":"Defend the C.L.E.A.N. 5000 golem." },
    { "id":"33F76E9E-0BB6-46D0-A3A9-BE4CDFC4A3A4", "name":"Destroy the fire elemental created from chaotic energy fusing with the C.L.E.A.N. 5000's energy core." },
    
    // Great Jungle Wurm Meta Event Chain
    { "id":"613A7660-8F3A-4897-8FAC-8747C12E42F8", "name":"Protect Gamarien as he scouts Wychmire Swamp." },
    { "id":"456DD563-9FDA-4411-B8C7-4525F0AC4A6F", "name":"Destroy the blighted growth." },
    { "id":"1DCFE4AA-A2BD-44AC-8655-BBD508C505D1", "name":"Kill the giant blighted grub." },
    { "id":"CF6F0BB2-BD6C-4210-9216-F0A9810AA2BD", "name":"Destroy the blighted growth." },
    { "id":"61BA7299-6213-4569-948B-864100F35E16", "name":"Destroy the avatars of blight." },
    { "id":"C5972F64-B894-45B4-BC31-2DEEA6B7C033", "name":"Defeat the great jungle wurm." },
    
    // Golem Mark II Meta Event Chain
    { "id":"3ED4FEB4-A976-4597-94E8-8BFD9053522F", "name":"Disable the containers before they release their toxins." },
    { "id":"9AA133DC-F630-4A0E-BB5D-EE34A2B306C2", "name":"Defeat the Inquest's golem Mark II." },
  ];
  
  // Store variables
  ScriptProperties.setProperty("TWITTER_CONSUMER_KEY",    TWITTER_CONSUMER_KEY);
  ScriptProperties.setProperty("TWITTER_CONSUMER_SECRET", TWITTER_CONSUMER_SECRET);
  ScriptProperties.setProperty("WORLD_ID",                WORLD_ID);
  ScriptProperties.setProperty("EVENT_REQUEST_URL",       EVENT_REQUEST_URL);
  ScriptProperties.setProperty("RELEVANT_EVENTS",         serializeEvents(RELEVANT_EVENTS));
}

/** Main Function -- Run this function to start Twitter  **/
/** Bot. You might not see tweets for up to 10 minutes   **/
/** after you click Run.                                 **/
function start() {
  set_constants();
    
  // Delete existing triggers, if any
  var triggers = ScriptApp.getScriptTriggers();
  
  for(var i=0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
    
  // Setup trigger to read Tweets every five minutes
  ScriptApp.newTrigger("fetchEvents")
           .timeBased()
           .everyMinutes(5)
           .create();
}

/** Helper Functions -- Mainly for converting between    **/
/** arrays of objects (what we get from requests) and    **/
/** equivalent strings (what ScriptProperties            **/
/** understands)                                         **/
function serializeEvents(eventsArr) {
  if (eventsArr.length < 2) return "";
  var result = eventsArr[0].id + "|" + eventsArr[0].name;
  for (var i = 1; i < eventsArr.length; ++i) {
    result += "|" + eventsArr[i].id + "|" + eventsArr[i].name;
  }
  return result;
}

function deserializeEvents(eventsStr) {
  var results = [];
  var strings = eventsStr.split("|");
  for (var i = 0; i < strings.length; i += 2) {
    results.push({
      "id": strings[i],
      "name": strings[i + 1]
    });
  }
  return results;
}

function serializeEventStates(eventStateArr) {
  if (eventStateArr.length < 2) return "";
  var result = eventStateArr[0].id + "|" + eventStateArr[0].state;
  for (var i = 1; i < eventStateArr.length; ++i) {
    result += "|" + eventStateArr[i].id + "|" + eventStateArr[i].state;
  }
  return result;
}

function deserializeEventStates(eventStateStr) {
  if (eventStateStr === null) return [];
  var results = [];
  var strings = eventStateStr.split("|");
  for (var i = 0; i < strings.length; i += 2) {
    results.push({
      "id": strings[i],
      "state": strings[i + 1]
    });
  }
  return results;
}

function findEventIndex(eventStateArr, id) {
  for (var i = 0; i < eventStateArr.length; ++i) {
    if (eventStateArr[i].id === id) return i;
  }
  return -1;
}

/** This authorizes you to use the twitter API and tweet **/
/** Must be called before you use the API!               **/
function oAuth() {
  var oauthConfig = UrlFetchApp.addOAuthService("twitter");
  oauthConfig.setAccessTokenUrl("https://api.twitter.com/oauth/access_token");
  oauthConfig.setRequestTokenUrl("https://api.twitter.com/oauth/request_token");
  oauthConfig.setAuthorizationUrl("https://api.twitter.com/oauth/authorize");
  oauthConfig.setConsumerKey(ScriptProperties.getProperty("TWITTER_CONSUMER_KEY"));
  oauthConfig.setConsumerSecret(ScriptProperties.getProperty("TWITTER_CONSUMER_SECRET"));
}

/** Here's where the magic happens - this function is    **/
/** called regularly (based on the trigger defined in    **/
/** the start() function above.                          **/
function fetchEvents() {
  try {
    oAuth();
    var eventRequestUrl = ScriptProperties.getProperty("EVENT_REQUEST_URL");
    var relevantEvents = deserializeEvents(ScriptProperties.getProperty("RELEVANT_EVENTS"));
    var eventStates = deserializeEventStates(ScriptProperties.getProperty("EVENT_STATES"));
    
    for (var i = 0; i < relevantEvents.length; ++i) {
      var eventObj = relevantEvents[i];
      
      var request = eventRequestUrl + "&event_id=" + eventObj.id;
      var eventResult = UrlFetchApp.fetch(request);
      if (!(eventResult.getResponseCode() === 200)) return;
      var eventData = Utilities.jsonParse(eventResult.getContentText());
      var currValue = eventData.events[0].state;
      
      var index = findEventIndex(eventStates, eventObj.id);
      var prevValue;
      if (index === -1) {
        prevValue = null;
        eventStates.push({
          "id": eventObj.id,
          "state": currValue
        });
      } else {
        prevValue = eventStates[index].state;
        eventStates[index].state = currValue;
      }
      
      if (prevValue !== null && prevValue != currValue) {
        sendTweet("\"" + truncate(eventObj.name) + "\" changed status from " + prevValue + " to " + currValue);
      }
      
      Logger.log("For Event \"%s\" (id %s), got:\n\tPrevious Status %s\n\tCurrent Status %s", eventObj.name, eventObj.id, prevValue, currValue);
    }
    ScriptProperties.setProperty("EVENT_STATES", serializeEventStates(eventStates));
  } catch (e) {
    Logger.log(e.toString());
  }
}

function truncate(eventName) {
  if (eventName.length < 96) return eventName;
  else return (eventName.substring(0, Math.min(eventName.length, 93)) + "...");
}

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

function testTweet() {
  set_constants();
  oAuth();
  var now = new Date();
  sendTweet("Testing 1, 2, 3. The time is now " + now.toUTCString());
}