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

function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);
  for (let i = 0; i < values.length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

function base64urlencode(arrayBuffer) {
  return btoa(String.fromCharCode(...arrayBuffer))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createCodeChallenge(code_verifier) {
  const hash = await sha256(code_verifier);
  return base64urlencode(hash);
}

async function startPKCEOAuth() {
  const clientId = "990409317415-21b44obshqu6jusjsvtf7dubbhsf8o5n.apps.googleusercontent.com";
  const redirectUri = "https://cube-king.github.io/UniPlay/oauth2callback.html";
  const scope = "https://www.googleapis.com/auth/youtube.readonly";

  const codeVerifier = generateRandomString(128);
  const codeChallenge = await createCodeChallenge(codeVerifier);
  localStorage.setItem("code_verifier", codeVerifier);  

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&code_challenge=${encodeURIComponent(codeChallenge)}` +
    `&code_challenge_method=S256`;

  window.location.href = authUrl;
}

function initGapiWithToken() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.log("Not signed in.");
    return;
  }

  gapi.load("client", () => {
    gapi.client.setToken({ access_token: token });

    gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(() => console.log("YouTube API ready"))
      .catch(err => console.error("API load error", err));
  });
}

function onPlayerReady(event) {
  console.log("Player is ready");
}
 
function onPlayerError(event) {
  console.error('YouTube Player Error:', event.data);
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

$(document).ready(function () {
  if (localStorage.getItem("access_token")) {
    initGapiWithToken();
  } else {
    console.log("No access token found");
  }
});