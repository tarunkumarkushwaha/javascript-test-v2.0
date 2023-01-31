// document declerations 
let frontpage = document.getElementById('frontpage')
let quespage = document.getElementById('quespage')
let quesonpage = document.getElementById('question')
let option1 = document.getElementById('option1')
let option2 = document.getElementById('option2')
let option3 = document.getElementById('option3')
let option4 = document.getElementById('option4')
let answer = document.querySelector('#answer')
answer.setAttribute("class",("answerInvisible"))
let whos_next = document.getElementById('whos_next')
let resultpage = document.getElementById('resultpage')
let time = document.getElementById('time')
let nextbutton = document.querySelector('#whos_next');
let optionselection = document.querySelectorAll('#option1, #option2, #option3, #option4');


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
        option1: "no halwa available !, please order on swiggy",
        option2: "halwa",
        option3: "no output",
        option4: "halwa is not defined",
        correctresponse: "questions[1].option4",
        time: 2
    },
    {
        question: "3. What will be the dinner",
        option1: "Paneer butter masala ",
        option2: "Only one and only Dudh roti",
        option3: "Veg + dudh roti",
        option4: "Aloo paratha",
        correctresponse: "questions[2].option2",
        time: 2
    }
]

// buttons 
const teststartbutton = () => {
    quespage.removeAttribute("class", "invisible")
    frontpage.removeAttribute("class", "frontpage")
    quespage.setAttribute("class", "visible")
    frontpage.setAttribute("class", "invisible")
    console.log(answer)
    time.removeAttribute("class", "invisible")
    time.innerHTML = countout(100)
    whos_next_handler()
}

let i = 0
const whos_next_handler = () => {
    answer.hasAttribute("answerVisible")?console.log("gadbad"):answer.setAttribute("class","answerInvisible")
    if (i < questions.length) {
        time.innerHTML = "100:00"
        quesonpage.innerHTML = questions[i].question;
        option1.innerHTML = questions[i].option1;
        option2.innerHTML = questions[i].option2;
        option3.innerHTML = questions[i].option3;
        option4.innerHTML = questions[i].option4;
        answer.innerHTML = `the correct answer is - ${eval(questions[i].correctresponse)}`
        i++
        if (i == questions.length) { nextbutton.setAttribute("class", "invisible") }
    }
}
const getAnswer = (e) => {
    console.log(e.target.value)
    answer.removeAttribute = ("class", "answerInvisible")
    answer.setAttribute("class", "answerVisible")
    // if(eval(questions[i].correctresponse)==)
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
optionselection.forEach(optionselection => optionselection.addEventListener('click', getAnswer));
