
let isPaused = false;
let countdownInterval;
let timeRemaining;
let pausedTimeRemaining;
let x=25;
let started;

function start(targetDate){
    targetDate = new Date().getTime() + x * 60 * 1000;

    started = true;
    if(started){
    }
    countdownInterval = setInterval(updateCountdown, 1000);
    function updateCountdown() {
        const currentDate = new Date().getTime();
        timeRemaining = targetDate - currentDate;
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`;
        console.log(minutes, seconds)
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "Your Session Has Ended!";
                }
    }
}

function addMin(){
    if(!started){
        if(x<60){
            x+=5;
        }
        document.getElementById("countdown").innerHTML = `${x}:00`;
    }
}
function remMin(){
    if(!started){
        if(x>15){
            x-=5;
        }
        document.getElementById("countdown").innerHTML = `${x}:00`;
    }
}



function stopstart(){
    if(started){
        stop();
        document.getElementById("start").textContent = "Start";
        started = false;
    } else{
        start(x);
        document.getElementById("start").textContent = "Stop";
    }
    document.getElementById("start").textContent.button.blur();

}

function stop(){
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = `${x}:00`;
    targetDate = new Date().getTime() + x * 60 * 1000;
    started = false;
    if(isPaused){
        document.getElementById("pause").textContent = "Pause";
    }
}

function pause() {
    if(started){
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(countdownInterval);
        document.getElementById("pause").textContent = "Resume";
    } else {
      targetDate = new Date().getTime() + timeRemaining;
      start(x);
      document.getElementById("pause").textContent = "Pause";
    }
  }
}



function startStreaming() {
    const audioUrl = './assets/sound.mp3';

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const audioElement = new Audio();
    audioElement.src = audioUrl;
    audioElement.loop = true; 

    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    audioElement.play();
}

window.onload = startStreaming;