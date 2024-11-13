
const currentSong = new Audio();
let currentlyPlaying = null; // Track the currently playing song




 async function getSongs() {
  // Specify song files manually
  return ["2 phone.mp3", "Dil Ke Badle Sanam.mp3", "song3.mp3"]; // Replace with your actual song filenames
}

async function main() {
  let songs = await getSongs();
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML += `<li> ${song} </li>`;
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
  console.log("hellohow are youy");

