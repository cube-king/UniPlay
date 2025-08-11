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

$(document).ready(function () {
  if (localStorage.getItem("access_token")) {
    initGapiWithToken();
  } else {
    console.log("No access token found");
  }
});