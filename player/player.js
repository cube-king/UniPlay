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

$(document).ready(function () {
  const code = localStorage.getItem('auth_code');
  if (code && !localStorage.getItem('access_token')) {
    console.log('Auth code:', code);
  }
});

function onPlayerReady(event) {
  console.log("Player is ready");
}
 
function onPlayerError(event) {
  console.error('YouTube Player Error:', event.data);
} 
 
function startOAuthFlow () {
  const clientId = '990409317415-474a7ac8a4jrrkr6ebj88crtbnpkbf49.apps.googleusercontent.com';
  const redirectUri = 'https://cube-king.github.io/UniPlay/oauth2callback.html';
  const scope = 'https://www.googleapis.com/auth/youtube.readonly';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

  window.location.href = authUrl;
}

async function setAccessToken(token) {
  await gapi.load('client', () => {
    gapi.client.setToken({ access_token: token });
  });
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

$("#auth").click(function (e) {
  startOAuthFlow();
});