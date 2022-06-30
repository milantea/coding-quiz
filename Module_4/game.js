const question = document.querySelector("#question");
const progressText = document.querySelector("#progressMessage");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

function timer() {
  let sec = 30;
  let timer = setInterval(function () {
    document.getElementById("timeDisplay").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}

let questions = [
  {
    question: "Commonly used data types do not inlcude:",
    choice1: "strings",
    choice2: "booleans",
    choice3: "arrays",
    choice4: "null",
    answer: 4,
  },
  {
    question: "How do you add a comment in JavaScript?",
    choice1: "//this is a comment",
    choice2: "<!--this is a comment-->",
    choice3: "<this is a comment>",
    choice4: "!this is a comment",
    answer: 1,
  },
  {
    question: "Arrays in JavaScript can be stored in:",
    choice1: "numbers and strings",
    choice2: "booleans",
    choice3: "other arrays",
    choice4: "all of the above",
    answer: 4,
  },
  {
    question: "Inside which HTML element do we put the JavaScript in?",
    choice1: "<javascript>",
    choice2: "<script>",
    choice3: "<scripts>",
    choice4: "<css>",
    answer: 2,
  },
  {
    question:
      "How do you write a conditional statement for executing statements if i is equal or less than 20?",
    choice1: "if i >== 20",
    choice2: "if i <== 20",
    choice3: "if (i >== 20)",
    choice4: "if (i <== 20)",
    answer: 3,
  },
];

//capitalized because variable will not change
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //spread operator turns variables into strings
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  //increments through question prompts and displays what question youre on
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  //calculates value of question
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    //notifies which choice has been picked
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
//if the answer is wrong or right returns the score
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.asnwer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    //adds up score
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
