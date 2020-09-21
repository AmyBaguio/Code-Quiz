const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const timeEl = document.querySelector("#time");
const ScoreEl = document.querySelector("#score");
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "<strings>",
        choice2: "<booleans>",
        choice3: "<alerts>",
        choice4: "<numbers>",
        answer: 3
    },

    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choice1: "<quotes>",
        choice2: "<curly brackets>",
        choice3: "<parentheses>",
        choice4: "<square brackets>",
        answer: 3
    },

    {
        question: "Arrays in javaScript can be used to store ____.",
        choice1: "<numbers and strings>",
        choice2: "<other arrays>",
        choice3: "<booleans>",
        choice4: "<all of the above>",
        answer: 4
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "<JavaScript>",
        choice2: "<terminal / bash>",
        choice3: "<for loops>",
        choice4: "<console log>",
        answer: 4
    }
];

//CONSTANTS
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

var secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            const initial = prompt("Game Over! Please enter your initial");

            let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

            highscores.push({
                name: initial,
                score: score,
            })

            localStorage.setItem('highscores', JSON.stringify(highscores));

        }

    }, 1000);
    console.log(timerInterval)

}
setTime();


startGame = () => {
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        } else {
            secondsLeft -= 10;

        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()

        }, 1000);
    })
})

incrementScore = num => {

    score += num
    ScoreEl.textContent = score
}

startGame();

