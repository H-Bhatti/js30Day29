let countDown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");


function timer (seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    // console.log(seconds)
    clearInterval(countDown);
    displayTimer(seconds);
    displayEndTime(then);


    countDown = setInterval(()=>{
        
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0){
            clearInterval(countDown);
            return;
        }
        displayTimer(secondsLeft);
    },1000)


    
}

function displayTimer (seconds){
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const display = `${min<10? "0":""}${min}:${sec<10? "0":""}${sec}`
    // console.log(display);
    document.title = display;

    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const min = end.getMinutes();
    endTime.textContent = `Be back at ${hours>12 ? hours-12 : hours}:${min<10? "0":""}${min}`

}

function buttonTimer(){
    timer(parseInt(this.dataset.time));
}
buttons.forEach(element => element.addEventListener("click", buttonTimer));

document.customForm.addEventListener("submit", function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    this.reset();
    timer(mins*60);
})