var player;
function onYouTubeIframeAPIReady() {
  const target = document.getElementById('player');
  if (!target) {
    console.error('Player element not found');
    return;
  }
  player = new YT.Player('player', {
    videoId: 'M7lc1UVf-VE',
    events: {
      onReady: onPlayerReady,
      onError: onPlayerError
    }
  });
}

function onPlayerError(event) {
  console.error('YouTube Player Error:', event.data);
}

console.log("finished player.js script")