const player = document.querySelector('audio');
const songs = document.querySelectorAll('.songName');

const switchSong = function(e){
    player.src = "";
    e.preventDefault();
    player.src = this.href
}

for(song of songs){
song.addEventListener('click', switchSong)
}
console.log(songs)
// Pause button functionality
const myAudio = document.getElementById("audioPlayer");
let isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = true;
};