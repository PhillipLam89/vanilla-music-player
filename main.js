const music = document.querySelector('audio')
//button selectors
const prevButton = document.getElementById('prev')
const playButton = document.getElementById('play')
const nextButton = document.getElementById('next')

let isMusicPlaying = false

// Play
function playSong() {
  isMusicPlaying = true
  playButton.classList.replace('fa-play', 'fa-pause')
  playButton.setAttribute('title', 'Pause')
  music.play()  //the play/pause method automatically comes with the "audio" element in html
}

//Pause

function pauseSong() {
  isMusicPlaying = false
  playButton.classList.replace('fa-pause', 'fa-play')
  playButton.setAttribute('title', 'Play')
  music.pause()
}

playButton.addEventListener('click', () => isMusicPlaying ? pauseSong() : playSong())
