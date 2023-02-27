import { questions } from "/questions.js"
// document declerations 
let frontpage = document.getElementById('frontpage')
let quespage = document.getElementById('quespage')
let quesonpage = document.getElementById('question')
let option1 = document.getElementById('option1')
let option2 = document.getElementById('option2')
let option3 = document.getElementById('option3')
let option4 = document.getElementById('option4')
let passPercentage = document.getElementById('passPercentage')
let pastresult = document.getElementById('pastresult')
let improvement = document.getElementById('improvement')
let Remarks = document.querySelector('#Remarks')
let prevresponse = document.querySelector('#prevresponse')
let blankmarksheet = document.querySelector('#blankmarksheet')
let whos_next = document.getElementById('whos_next')
let resultpage = document.getElementById('resultpage')
let time = document.getElementById('time')
let nextbutton = document.querySelector('#whos_next');
let startbutton = document.querySelector('#teststartbutton');
let retrybutton = document.querySelector('#Retry');
let optionselection = document.querySelectorAll('#option1, #option2, #option3, #option4');

// audios 
let trueSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_b8c9103636.mp3?filename=correct-83487.mp3");
let falseSound = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=negative_beeps-6008.mp3");
let timeover = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_ad24b5e301.mp3?filename=bell-ringing-43862.mp3")

// mock questions for testing

// let questions = [
//     {
//         question: "1. eval(5+2)",
//         option1: "calculate by your self, i can't do it",
//         option2: "52",
//         option3: "7",
//         option4: "error",
//         correctresponse: "questions[0].option3",
//         time: 2
//     }
// ]

// Remarks 

let quotes = [
    {
        zero: "Once you learn to quit, it becomes a habit, So don't quit",
        sound: "https://cdn.pixabay.com/download/audio/2022/06/08/audio_e5d4fb5405.mp3?filename=no-luck-too-bad-disappointing-sound-effect-112943.mp3"
    },
    {
        per1020: "To aim is not enough, you must hit!",
        sound: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_00a12a8dc1.mp3?filename=piano-crash-sound-37898.mp3"
    },
    {
        per3050: "Our greatest glory is not in never failing, but in getting up every time we do. ~ Confucius",
        sound: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_bf3620f48d.mp3?filename=yay-6120.mp3"
    },
    {
        per60: "To think is easy. To act is hard. But the hardest thing in the world is to act in accordance with your thinking.",
        sound: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_2722574464.mp3?filename=badge-coin-win-14675.mp3"
    },
    {
        per7080: "The important thing is to dare to dream big, then take action to make it come true.",
        sound: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_3047f54f23.mp3?filename=winfantasia-6912.mp3"
    },
    {
        per90: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
        sound: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3"
    },
    {
        per100: "Pleasure in the job puts perfection in the work. ~ Aristotle",
        sound: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3"
    }
]
// Preset 

let prevpercent = localStorage.getItem("percentage") ? localStorage.getItem("percentage") : "0"
prevresponse.innerHTML = `Previous Score - ${JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')).length : 0}/${questions.length}`
pastresult.innerHTML = `<span class="yellowdot"></span> past performance => ${Number(Math.round(parseInt(prevpercent) + 'e2') + 'e-2')} %`
let answerarray = []

// buttons 
const teststart = () => {
    localStorage.clear()
    quespage.removeAttribute("class", "invisible")
    frontpage.removeAttribute("class", "frontpage")
    quespage.setAttribute("class", "visible")
    frontpage.setAttribute("class", "invisible")
    time.removeAttribute("class", "invisible")
    time.innerHTML = countout(10)
    whos_next_handler()
}

let i = 0
let j = ""
let percentage
const whos_next_handler = () => {
    option1.removeAttribute('class')
    option2.removeAttribute('class')
    option3.removeAttribute('class')
    option4.removeAttribute('class')
    optionselection.forEach(optionselection => optionselection.addEventListener('click', getAnswer));
    if (i < questions.length) {
        time.innerHTML = "..wait"
        quesonpage.innerHTML = questions[i].question;
        option1.innerHTML = questions[i].option1;
        option2.innerHTML = questions[i].option2;
        option3.innerHTML = questions[i].option3;
        option4.innerHTML = questions[i].option4;
        j = eval(questions[i].correctresponse)
        i++
        if (i == questions.length) { nextbutton.setAttribute("class", "invisible") }
    }
}
const getAnswer = (e) => {
    j == e.target.innerHTML ? answerarray.push(true) : null;
    j == e.target.innerHTML ? trueSound.play() : falseSound.play()
    j == e.target.innerHTML ? e.target.setAttribute('class', 'answer-correct') : e.target.setAttribute('class', 'answer-wrong')
    optionselection.forEach(optionselection => optionselection.removeEventListener('click', getAnswer));
}
const retry = () => {
    window.location.reload()
}

const resultpagehandler = () => {
    blankmarksheet.innerHTML = `No of correct responses are ${answerarray.length} and incorrect responses are ${questions.length - answerarray.length}`
    localStorage.setItem("items", JSON.stringify(answerarray))
    time.remove()
    quespage.remove()
    percentage = (answerarray.length / questions.length) * 100
    // console.log(Number(Math.round(parseInt(prevpercent) + 'e2') + 'e-2'));
    localStorage.setItem("percentage", percentage)
    passPercentage.innerHTML = `<span class="greendot"> </span> Present performance => ${Number(Math.round(percentage + 'e2') + 'e-2')} %`
    improvement.innerHTML = `Improvement => ${Number(Math.round((percentage - parseInt(prevpercent)) + 'e2') + 'e-2')} %`
    if (percentage == 0) {
        new Audio(quotes[0].sound).play()
        Remarks.innerHTML = quotes[0].zero
    }
    else if (percentage > 0 && percentage <= 30) {
        new Audio(quotes[1].sound).play()
        Remarks.innerHTML = quotes[1].per1020
    }
    else if (percentage > 30 && percentage <= 59) {
        new Audio(quotes[2].sound).play()
        Remarks.innerHTML = quotes[2].per3050
    }
    else if (percentage > 59 && percentage <= 69) {
        new Audio(quotes[3].sound).play()
        Remarks.innerHTML = quotes[3].per60
    }
    else if (percentage > 69 && percentage <= 89) {
        new Audio(quotes[4].sound).play()
        Remarks.innerHTML = quotes[4].per7080
    }
    else if (percentage > 90 && percentage <= 99) {
        new Audio(quotes[5].sound).play()
        Remarks.innerHTML = quotes[5].per90
    }
    else {
        new Audio(quotes[6].sound).play()
        Remarks.innerHTML = quotes[6].per100
    }
    move()
    move2()
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
            timeover.play()
            resultpagehandler()
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
startbutton.addEventListener("click", teststart);
retrybutton.addEventListener("click", retry);

// progressbar
let k = 0;
function move() {
    if (k == 0) {
        k = 1;
        var elem2 = document.getElementById("myBar");
        var width2 = 1;
        var id2 = setInterval(frame, 20);
        console.log('percentage is - ',percentage)
        function frame() {
            if (width2 >= percentage) {
                clearInterval(id2);
                k = 0;
            } else {
                width2++;
                elem2.style.width = width2 + "%";
                console.log("width is - ",width2)
            }
        }
    }
}
// Bar 2 
let p = 0;
function move2() {
    if (p == 0) {
        p = 1;
        var elem = document.getElementById("myBar2");
        var width = 1;
        var id = setInterval(frame, 20);
        function frame() {
            if (width >= parseInt(prevpercent)) {
                clearInterval(id);
                p = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}