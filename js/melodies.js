let allSongs = document.querySelectorAll("audio");

function toggleSong(songId, progressId, button){

let song = document.getElementById(songId);
let progress = document.getElementById(progressId);

/* Pause all other songs */
allSongs.forEach(audio => {
    if(audio.id !== songId){
        audio.pause();
        audio.currentTime = 0;

        let otherBtn = audio.parentElement.querySelector(".play-btn");
        if(otherBtn) otherBtn.textContent = "▶";
    }
});

if(song.paused){
    song.play();
    button.textContent = "⏸";
}else{
    song.pause();
    button.textContent = "▶";
}

/* Progress Bar */
song.ontimeupdate = () => {
    progress.value = (song.currentTime / song.duration) * 100 || 0;
};

/* Manual Seek */
progress.oninput = () => {
    song.currentTime = (progress.value / 100) * song.duration;
};

}
