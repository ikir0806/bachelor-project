const musicPlayer = document.querySelector('.audio__player');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');

const speedIndicator = document.querySelector('.speed');
const speedNumber = document.querySelector('.speed p');
const speedOptions = [1.0, 1.5, 2.0, 0.75];
let speedIndex = 0;

const progressContainer = document.querySelector('.audio__player-progress');
const progress = document.querySelector('.progress');

const audioTitle = document.querySelector('.audio__title');
const audioImage = document.querySelector('.audio__img');

let songs;
let songIndex = 0;
let cover;

function loadSong(song) {
    let coverSrc = song.cover;
    coverSrc = `img/${coverSrc}.jpg`;
    audioTitle.innerText = song.title;
    audio.src = `${song.audio}`;
    audioImage.style.backgroundImage = `url('${coverSrc}')`;
}

function isAudioPlaying() {
    return musicPlayer.classList.contains('playing');
}

function playAudio() {
    musicPlayer.classList.add('playing');
    playBtn.querySelector('i').classList.remove('ph-play-circle');
    playBtn.querySelector('i').classList.add('ph-pause-circle');
    audio.playbackRate = `${speedOptions[speedIndex]}`;
    audio.play();
}

function pauseAudio() {
    musicPlayer.classList.remove('playing');
    playBtn.querySelector('i').classList.add('ph-play-circle');
    playBtn.querySelector('i').classList.remove('ph-pause-circle');
    audio.pause();
}

cover = sessionStorage.getItem("albumName");
console.log(cover);

async function getAlbum(cover) {
    const response = await fetch("/albums/" + cover, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        songs = await response.json();
        console.log(songs);
        loadSong(songs[songIndex]);
    }
}
getAlbum(cover);

function prevSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = '0%';
    isAudioPlaying() === true ? playAudio() : pauseAudio();
}

function nextSong() {
    songIndex += 1;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = '0%';
    isAudioPlaying() === true ? playAudio() : pauseAudio();
}

function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function updateProgressBarPlayPosition(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

function updateSpeedIndicator() {
    speedIndex += 1;
    if (speedIndex > speedIndex.length - 1) {
        speedIndex = 0;
    }
    speedNumber.textContent = `${speedOptions[speedIndex]}x`;
    playAudio();
}

playBtn.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudio() : playAudio();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', updateProgressBarPlayPosition);