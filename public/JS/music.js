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

