// document declerations 
let frontpage = document.getElementById('frontpage')
// let examsession = document.getElementById('examsession')
let quespage = document.getElementById('quespage')
let resultpage = document.getElementById('resultpage')
let blankmarksheet = document.getElementById('blankmarksheet')
let time = document.getElementById('time')
let prevresult = document.getElementById('prevresponse')

// // response outlet
// let response = []
// prevresult.innerText = localStorage.getItem("responses") ? localStorage.getItem("responses")
//  : "Previous Records - no previous record, lets try for the best"
// frontpage.append(prevresult)

// question object testing
let questions = [
    {
        question1: "1. What will be the output of the following code snippet var a = \"Scaler\" \n var result = a.substring(2, 4)\ndocument.write(result)",
        option1: "calculate by your self, i can't do it",
        option2: "cal",
        option3: "al",
        option4: "ali",
        correctresponse: "questions[0].option3" ,
        time:  2
    },
    {
        question2: "1. What will be the output of the following code snippet var a = \"Scaler\" \n var result = a.substring(2, 4)\ndocument.write(result)",
        option1: "calculate by your self, i can't do it",
        option2: "cal",
        option3: "al",
        option4: "ali",
        correctresponse: "questions[0].option3" ,
        time:  2
    }
]


// buttons 
const teststartbutton = () => {
    countout()
    quespage.removeAttribute("class", "invisible")
    frontpage.removeAttribute("class", "frontpage")
    quespage.setAttribute("class", "visible")
    frontpage.setAttribute("class", "invisible")
    time.removeAttribute("class", "invisible")
    console.log(questions[1])
}
const retry = () => {
    window.location.reload()
}
// const next question = () => {
//     quespage1.setAttribute("class", "invisible")
//     quespage2.removeAttribute("class", "invisible")
//     quespage2.setAttribute("class", "visible")
// }

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
            // console.log("your response is " , response)
        }
    }, 1000);
}
const countout = () => {
    let twoMin = 60 * 10;
    // let twoMin = 10;
    let display = document.querySelector('#time');
    startTimer(twoMin, display);
};

// radios selections
// ques 
const btnsubmit = document.querySelector('#btnsubmit');
const radioButtons = document.querySelectorAll('input[name="size"]');
btnsubmit.addEventListener("click", () => {
    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    // save the response 
    // selectedSize ? response.push(selectedSize) : response.push(false)
    // blankmarksheet.innerHTML = `No of wrong ans - ${response.filter((ans) => ans != true).length}/5 and no of True ans - ${response.filter((ans) => ans != false).length}/5`
    // localStorage.setItem("responses", `Previous result - ${blankmarksheet.innerText}`)
    // console.log(response)
});
btnsubmit.addEventListener("click", resultpagehandler);
