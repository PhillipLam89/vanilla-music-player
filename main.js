

const music = document.querySelector('audio')
const progressContainer =document.getElementById('progress-container')
const progress =  document.getElementById('progress')
const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')
const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

// collection of all songs in library
const songs = [
   { name: 'jacinto-1',
     displayName: 'Electric Chill machine',
     artist: 'Jacinto'
    },
   { name: 'jacinto-2',
     displayName: '7 Nation Army Remix',
     artist: 'Jacinto'
    },
   { name: 'jacinto-3',
     displayName: 'Murder all humans',
     artist: 'Jacinto'
    }
]
//onload, select first song
let currentSongIndex = 0
loadSong(songs[0])


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

//Update DOM (aka clickin next/prev song)

function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`

  songs.forEach((song, index) => {
    if (song.displayName === title.textContent) {
      currentSongIndex = index

    }
  })
}

// next song button

nextButton.addEventListener('click', () => {
   currentSongIndex++
     if (currentSongIndex > songs.length -1) {
       currentSongIndex = 0
   }
   loadSong(songs[currentSongIndex])
   isMusicPlaying && music.play()

})
// previous song button
prevButton.addEventListener('click', () => {
     currentSongIndex--
     if (currentSongIndex < 0) {
       currentSongIndex = songs.length - 1
   }
   loadSong(songs[currentSongIndex])
   isMusicPlaying && music.play()
})

function updateProgressBar(e) {

   if (isMusicPlaying) {
     const {duration, currentTime} = e.srcElement
     const progressPercent = (currentTime / duration) * 100
     progress.style.width = `${progressPercent}%`

          //minutes calculation
     const durationMinutes = Math.floor(duration / 60)
          //seconds calculation

     let durationSeconds = Math.floor(duration % 60)
     if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`

     if (durationSeconds) {
        durationElement.textContent = `${durationMinutes}:${durationSeconds}`
     }

          //minutes calculation for how much time passed
     const currentMinutes = Math.floor(currentTime / 60)
          //seconds calculation for how much time passed

     let currentSeconds = Math.floor(currentTime % 60)
     if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`
     currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`

   }
}

function setProgressBar(e) {
  const totalWidth = this.clientWidth
  const userClickedWidth = e.offsetX
  // since this is an event, 'this' will refer to the element that received the event
  const {duration} = music // total length of current song

  music.currentTime = userClickedWidth/totalWidth * duration


}
music.addEventListener('timeupdate', updateProgressBar) //time update event runs 4x every second, which can be used to display our current song time(s)
progressContainer.addEventListener('click', setProgressBar)
