let sangeet;
let element;
let currfolder;
// const currentSong = new Audio();
// let currentlyPlaying = null; // Track the currently playing song

//  async function getSongs() {
//   // Specify song files manually
//   return ["2 phone.mp3", "Dil Ke Badle Sanam.mp3", "song3.mp3"]; // Replace with your actual song filenames
// }
function formatSeconds(seconds) {
  // Ensure the input is a valid number and round it to the nearest integer
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds); // Truncate to ensure whole seconds

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Format minutes and seconds to always be two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

let currentsong = new Audio();
async function getsongs(folder) {
  currfolder = folder;
  let a = await fetch(`https://abhishek-arch.github.io/spotify-clone/${folder}/`);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  sangeet = [];
  for (let index = 0; index < as.length; index++) {
    element = as[index];
    if (element.href.endsWith(".mp3")) {
      sangeet.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of sangeet) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <img class="invert" src="img/music.svg" width="34" height="34" alt="">
                <div class="info">
                  <div> ${song.replaceAll("%20", " ")}</div>
                  <div> Abhi</div>
                </div>
                <div class="playnow flex justify-center items-center">
                  <span>Play Now</span>
                  <img class="invert" src="img/play.svg" width="24" alt="">
                </div></li>`;
  }
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  return sangeet;
}
const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/" + track)
  currentsong.src = `/${currfolder}/` + track;

  if (!pause) {
    currentsong.play();
    play.src = "img/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
  let a = await fetch(`https://abhishek-arch.github.io/spotify-clone/songs/`);
  let response = await a.text()
 
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchor = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".songcontainer")
  let array = Array.from(anchor)
  for (let index = 0; index < array.length; index++) {
      const e = array[index]; 
      if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
          let folder = e.href.split("/").slice(-2)[0]
          
          // Get the metadata of the folder
          let a = await fetch(`https://abhishek-arch.github.io/spotify-clone/songs/${folder}/info.json`)
          let response = await a.json(); 
          cardContainer.innerHTML = cardContainer.innerHTML + ` <div  data-folder="${folder}" class="card" id="${folder}">
          

          <img width = "350" src="/songs/${folder}/cover.jpg" alt="">
          <h1 style = "font-size:45px" class = "invert">${response.title}</h2>
          <h2 style = "font-size:31px"  class = "invert">${response.description}</p>
          <div class="button">
              <img src="img/button.svg" alt="" />
            </div>
      </div>`
      }
  }









  Array.from(anchor).forEach( async e => {
    if(e.href.includes("/songs")){
      let folder = (e.href.split("/").slice(-2) [0])
      let a = await fetch(`/songs/${folder}/info.json`);
      let response = await a.json();
      console.log(response)
    }
   
  })

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      console.log("Fetching Songs");
      sangeet = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(sangeet[0]);
    });
  });
}
displayAlbums()

async function main() {
  await getsongs("songs/ncs");
  playMusic(sangeet[0], true);


  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "img/pause.svg";
    } else {
      currentsong.pause();
      play.src = "img/play.svg";
    }
  });
  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatSeconds(
      currentsong.currentTime
    )}:${formatSeconds(currentsong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });
  document.querySelector(".hamburger").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = "0";
  });
  document.querySelector(".cross").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = "-120%";
  });

  document.querySelector(".previous").addEventListener("click", () => {
    let index = sangeet.indexOf(currentsong.src.split("/songs/")[1]);

    if (index > 0) {
      playMusic(sangeet[index - 1]);
    }
  });

  document.querySelector(".next").addEventListener("click", () => {
    let index = sangeet.indexOf(currentsong.src.split("/songs/")[1]);
    if (index + 1 < sangeet.length) {
      console.log(sangeet.length);
      playMusic(sangeet[index + 1]);
    } else {
      console.log("Playlist ended");
    }
  });

  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("volume is ", e.target.value, "/100");
      currentsong.volume = parseInt(e.target.value) / 100;
      console.log(currentsong.volume);
    });
  
document.querySelector(".volume>img").addEventListener("click", (e) => {
  if (currentsong.volume === 0) {
    currentsong.volume = 0.1;
    e.target.src = "img/volume.svg";
    document.querySelector(".range")
    .getElementsByTagName("input")[0].value = 40;

  } else {
    currentsong.volume = 0;
    e.target.src = "img/mute.svg";
    document.querySelector(".range")
    .getElementsByTagName("input")[0].value = 0;
  }
});
}
main();
