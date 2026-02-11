function toggleSong(songId, progressId, button){

let song = document.getElementById(songId);
let progress = document.getElementById(progressId);

if(song.paused){
    song.play();
    button.textContent = "⏸";
}else{
    song.pause();
    button.textContent = "▶";
}

song.ontimeupdate = () => {
    progress.value = (song.currentTime / song.duration) * 100;
};

progress.oninput = () => {
    song.currentTime = (progress.value / 100) * song.duration;
};

}
