
let questions = [
    {
        question: "Commonly used Data Types DO NOT include:",
        choices:["1. strings", "2. boolean", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        choices:["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choices:["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        choices:["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
]

var questionIndex = 0;
var time = questions.length * 15;
var timerId;
// timer variables
var timerEl = document.getElementById("timer");

// main page variables
var startButton = document.getElementById("start-btn");

// question variables
var questionContainerEl = document.getElementById("questionPage");
var quesTitleEl = document.getElementById("questionTitle")
var answerOneEl = document.getElementById("answer1")
var answerTwoEl = document.getElementById("answer2")
var answerThreeEl = document.getElementById("answer3")
var answerFourEl = document.getElementById("answer4")
var answerCheckEl = document.getElementById("check")

// score variables
var nameEnter = document.getElementById("nameInput")

var submitEl = document.getElementById("nameSubmitBtn")


function startQuiz() {
    // hides the main page
    var mainPage = document.getElementById("main-page")
    mainPage.setAttribute("class", "hide");

    // brings in questions
    questionContainerEl.removeAttribute("class");

    // starts timer
    timerId = setInterval(timerStart, 1000);

    // shows timer
    timerEl.textContent = time;

    // calls questions
    showQuiz();

}

function showQuiz() {
    getQuestion();
}

// defines timer for start function
function timerStart() {
    time--;
    timerEl.textContent = time;

    //if timer runs out 
    if (time <= 0) {
        endQuiz();
    }
}

function getQuestion() {
    // gets question from array 
    quesTitleEl.textContent = questions[questionIndex].question;
    answerOneEl.textContent = questions[questionIndex].choices[0];
    answerTwoEl.textContent = questions[questionIndex].choices[1];
    answerThreeEl.textContent = questions[questionIndex].choices[2];
    answerFourEl.textContent = questions[questionIndex].choices[3];
}

function answerSelect(answer) {
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {

        if (time < 0) {
            time = 0;
        }

        // shows new time
        timer.textContent = time;

        answerCheckEl.textContent = "Correct!"
    } else {
        // removes time
        time -= 15;
        answerCheckEl.textContent = "Wrong!"
    }

    answerCheckEl.setAttribute("class", "check");
    setTimeout(function(){
        answerCheckEl.setAttribute("class", "check hide");
    }, 1000);

    questionIndex++;
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
};

function choiceA() { answerSelect(0); }
function choiceB() { answerSelect(1); }
function choiceC() { answerSelect(2); }
function choiceD() { answerSelect(3); }

function endQuiz() {
    // gets rid of timer
    clearInterval(timerId);

    var endPageEl = document.getElementById("finalPage");
    endPageEl.removeAttribute("class");

    // shows score
    var scoreEl = document.getElementById("final-score");
    scoreEl.textContent = time;

    // hides questions 
    questionContainerEl.setAttribute("class", "hide");
}

// adds highscores
function saveScores() {
    var nameInput = nameEnter.value.trim();

    // if nothing is entered send an alert 
    if (nameInput !== "") {
        // creates new score for new quiz
        var newScore = {
            score: time,
            nameInput: nameInput
        };

        // gets saved score from local storage 
        var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

        // saves to storage
        highscore.push(newScore);
        window.localStorage.setItem("highscore", JSON.stringify(highscore));

        // adds it to high score page
        window.location.href = "score.html";
    }


}

// starts quiz
startButton.onclick = startQuiz;

answerOneEl.addEventListener("click", choiceA);
answerTwoEl.addEventListener("click", choiceB);
answerThreeEl.addEventListener("click", choiceC);
answerFourEl.addEventListener("click", choiceD);

submitEl.onclick = saveScores;