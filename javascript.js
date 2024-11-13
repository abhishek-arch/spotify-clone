
const currentSong = new Audio();
let currentlyPlaying = null; // Track the currently playing song




async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main() {
  let songs = await getSongs();
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML += `<li> ${song.replaceAll("%20", " ")} </li>`;
  }

  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      playMusic(e.innerHTML.trim());
    });
  });

}

// const playMusic = (track) => {
//   const trackPath = `/songs/${track}`;

//   if (currentlyPlaying === track) {
//     // If the same song is clicked, toggle play/pause
//     if (currentSong.paused) {
//       currentSong.play();
//       document.getElementsByClassName("playbutton")[0].innerHTML = `<img width="35" id="play" src="home.svg" alt="">`
//     } else {
//       currentSong.pause();
//        document.getElementsByClassName("playbutton")[0].innerHTML = originalplaybutton;
//     }
//   } else {
//     // If a different song is clicked, load and play the new song
//     currentSong.src = trackPath;
//     currentSong.play();
//     currentlyPlaying = track;
//   }
  
//   currentSong.onended = () => {
//     // Reset when the song ends
//     currentlyPlaying = null;
//   };
// };

// window.onload = function() {

//   let originalplaybutton = '';
  
//   const playButtonElement = document.getElementsByClassName("playbutton")[0];
//   originalplaybutton = playButtonElement.innerHTML;
//   console.log(originalplaybutton);
  main();

