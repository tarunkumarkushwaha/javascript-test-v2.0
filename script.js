// document declerations 
let frontpage = document.getElementById('frontpage')
let quespage = document.getElementById('quespage')
let quesonpage = document.getElementById('question')
let option1 = document.getElementById('option1')
let option2 = document.getElementById('option2')
let option3 = document.getElementById('option3')
let option4 = document.getElementById('option4')
let answer = document.getElementById('answer')
let whos_next = document.getElementById('whos_next')
let resultpage = document.getElementById('resultpage')
let time = document.getElementById('time')
let nextbutton = document.querySelector('#whos_next');


// virtual get response for testing
let questions = [
    {
        question: "1. What will be the output of the following code snippet var a = \"Scaler\" \n var result = a.substring(2, 4)\ndocument.write(result)",
        option1: "calculate by your self, i can't do it",
        option2: "cal",
        option3: "al",
        option4: "ali",
        correctresponse: "questions[0].option3",
        time: 2
    },
    {
        question: "2. What will be the output of the following code snippet console.log(halwa)",
        option1: "no halwa available !, please order on swingy",
        option2: "halwa",
        option3: "no output",
        option4: "halwa is not defined",
        correctresponse: "questions[0].option4",
        time: 2
    }
]


// buttons 
const teststartbutton = () => {
    quespage.removeAttribute("class", "invisible")
    frontpage.removeAttribute("class", "frontpage")
    quespage.setAttribute("class", "visible")
    frontpage.setAttribute("class", "invisible")
    time.removeAttribute("class", "invisible")
    time.innerHTML=countout(1)
    whos_next_handler()
}
const getanswer = () => {
    answer.innerHTML = questions[0].correctresponse
    // eval(questions[i].correctresponse)
}

let i = 0
const whos_next_handler = () => {
    if (i < questions.length) {
        // time.innerHTML=countout(questions[i].time)
        quesonpage.innerHTML = questions[i].question;
        option1.innerHTML = questions[i].option1;
        option2.innerHTML = questions[i].option2;
        option3.innerHTML = questions[i].option3;
        option4.innerHTML = questions[i].option4;
        console.log(questions[i].question);
        i++
        if (i == questions.length) { nextbutton.setAttribute("class", "invisible") }
    }
}
const retry = () => {
    window.location.reload()
}

const resultpagehandler = () => {
    time.remove()
    quespage.remove()
    resultpage.removeAttribute("class", "invisible")
    resultpage.setAttribute("class", "visible")
}

// timers 
const startTimer = (duration, display) => {
    let timer = duration
    let minutes
    let seconds
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            whos_next_handler()
        }
    }, 1000);
}
const countout = (num) => {
    let Min = 60 * num;
    let display = document.querySelector('#time');
    startTimer(Min, display);
};

// event listeners
btnsubmit.addEventListener("click", resultpagehandler);
whos_next.addEventListener("click", whos_next_handler);
