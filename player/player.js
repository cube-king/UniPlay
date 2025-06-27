var player;
console.log('YT API loaded:', typeof YT, 'YT.Player exists?', !!YT.Player);
function newIframe(id) {
  const target = document.getElementById('player');
  if (!target) {
    console.error('Player element not found');
    return;
  }
  player = new YT.Player('player', {
    videoId: id,
    events: {
      onReady: onPlayerReady,
      onError: onPlayerError
    }
  }); 
}

function onPlayerReady(event) {
  console.log("Player is ready");
}
 
function onPlayerError(event) {
  console.error('YouTube Player Error:', event.data);
} 

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() { 
  gapi.client.setApiKey("AIzaSyAVSegQGcXQmzzbNv-3p5xFfxlps3Powv0");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
function execute() {
    return gapi.client.youtube.playlists.list({
      "part": [
        "id"
      ],
      "maxResults": 25,
      "mine": true 
    })
        .then(function(response) {    
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              }, 
              function(err) { console.error("Execute error", err); });
  }   
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "990409317415-474a7ac8a4jrrkr6ebj88crtbnpkbf49.apps.googleusercontent.com"});
  });
 
 
$("#play").click(function () { 
  if (!player) {  
      console.error("YouTube player is not ready yet.");
      return; 
  } 

  const playerstate = player.getPlayerState();  
  console.log("playerstate", playerstate);

  if (playerstate === 1) {
      player.pauseVideo();
  } else if (playerstate === 2 || playerstate === 5) {
      player.playVideo();
  }
}); 

$("#testvid1").click(function (e) { 
  if (!player) {
    newIframe("QY8dhl1EQfI");
  } else {
    player.cueVideoById("QY8dhl1EQfI",0);
  }
});

$("#testvid2").click(function (e) { 
  if (!player) {
    newIframe("DgFSkstbBvU");
  } else {
    player.cueVideoById("DgFSkstbBvU",0);
  }
});

$("#auth").click(function (e) { 
  authenticate().then(loadClient).catch(err => console.error("Auth failed:", err));
});

$("#exec").click(function (e) { 
  execute();
});