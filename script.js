
let isPaused = false;
let timeRemaining,countdownInterval,addTime,pausedTimeRemaining,started,muted,isBell;
const audioElement = new Audio();
let x=25;
let minutes,seconds;
let fstarted = 0;
var click = document.getElementById('click');
function bell(){
    let bell = document.getElementById("bell")
    bell.play();
}


function start(t){
    txt = 
    started = true;
    fstarted+=1;
    targetDate = new Date().getTime() + t * 60 * 1000;
    if(started){
    }
    countdownInterval = setInterval(updateCountdown, 1000);
    function updateCountdown() {
        const currentDate = new Date().getTime();
        timeRemaining = targetDate - currentDate;
        minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        if(seconds<10){
            seconds =`0${seconds}`
        } else if(minutes<10){
            minutes = `0${minutes}`
        }
        document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`;
        document.title = `${minutes}:${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = `05:00`;

            bell();
            pauseMusic();
            isBell=true;
            setTimeout(() => {
                isBell=false;
                pauseMusic();
                document.getElementById("end").innerHTML = ``;
                startBreak();
            }, 22000);
           


        }
    }
}




function startBreak() {
    targetDate = new Date().getTime() + 0.2 * 60 * 1000; 
    countdownInterval = setInterval(updateCountdown, 1000);

        const currentDate = new Date().getTime();
        timeRemaining = targetDate - currentDate;
        minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = `0${seconds}`
        } else if (minutes < 10) {
            minutes = `0${minutes}`
        }
        document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("end").innerHTML = `Your break has ended. Starting a new session...`;
            start(x)
        
    }
}
function addMin(){
    ClickSound();
    if(!started){
        if(x<60){
            x+=5;
            document.getElementById("countdown").innerHTML = `${x}:00`;
        }
    }
}
function remMin(){
    ClickSound()
    if(!started){
        if(x>15){
            x-=5;
            document.getElementById("countdown").innerHTML = `${x}:00`;
        }
    }

}




function stopstart(){
    ClickSound()

    if(started){
        stop();
        document.getElementById("start").textContent = "Start";
        started = false;
    } else{
        start(x);
        document.getElementById("start").textContent = "Stop";
    }

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
    ClickSound()

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


// streaming the audio
function startStreaming() {
    if(fstarted==0){
        const audioUrl = './assets/sound.mp3';
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioElement.src = audioUrl;
        audioElement.loop = true;

        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(audioContext.destination);

        audioElement.addEventListener('canplaythrough', function () {
            audioElement.play();
            audioElement.removeEventListener('canplaythrough', arguments.callee);
        });

        audioElement.play().catch(function(error) {
            console.error('Autoplay blocked:', error);
        });
    }
}



function pauseMusic(){
    if(fstarted && !isBell){
        if(audioElement.paused && muted){
            muted = false
            audioElement.play();
        } else{
        muted = true;
        audioElement.pause();
         }
    }
  
}
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

function addTask() {
    ClickSound()

    const taskText = todoInput.value.trim();
    if (taskText === "") {
    alert("Please enter a task.");
            return;
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
        <div id="right">
        <input type="checkbox" id="isDone" name="task" value="done">
        <span>${taskText}</span>
        </div>
        <span class="delete-btn" onclick="deleteTask(this)">❌</span>
    `;
        todoList.appendChild(todoItem);

        todoInput.value = "";

    }

function deleteTask(element) {
    ClickSound()

        const todoItem = element.parentElement;
        todoList.removeChild(todoItem);
    }



function changeMuteIcon(){
    if(!muted && fstarted){
    mute.innerHTML= `
    <img src="./assets/mute.png">`
    } else{
        mute.innerHTML = `<img src="./assets/music.png">`
    }
}


function Break(){
    start(5);

    
}



function ClickSound(){
    click.currentTime = 0; 
    click.play();
}