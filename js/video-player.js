/* window.onload = function () {
    const movieName = sessionStorage.getItem("movieName");
    const sourceRow = `<source src="./videos/${movieName}.mp4" type="video/mp4">`;
    document.querySelector('video').insertAdjacentHTML('afterbegin', sourceRow);
    sessionStorage.clear();
} */

//const { load } = require("mime");

/// / QUERY SELECTORS ////

// Music Player
const videoSrc = document.querySelector('#video');

// Title and Image
const videoTitle = document.querySelector('.video__title');

// Songs
let songs;
let songIndex = 0;
let movieName;
let video;

/// / FUNCTIONS ////

// update UI with current song
function loadMovie(title, src) {
    src = `videos/${src}.mp4`;
    console.log(src);
    videoTitle.innerText = title;
    videoSrc.src = `${src}`;
}


video = sessionStorage.getItem("movieName");
console.log(video);

async function GetMovie(video) {
    const response = await fetch("/movies/" + video, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        console.log('aaaaaaa');
        const movie = await response.json();
        console.log(movie);

        console.log(movie.title, movie.video);
        loadMovie(movie.title, movie.video);
    }
}
GetMovie(video);