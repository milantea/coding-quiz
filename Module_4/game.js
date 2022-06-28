const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Commonly used data types do not inlcude:",
    choice1: "stings",
    choice2: "booleans",
    choice3: "arrays",
    choice4: "null",
  },
  {
    question: "How do you add a comment in JavaScript",
    choice1: "!this is a comment",
    choice2: "<!--this is a comment-->",
    choice3: "<this is a comment>",
    choice4: "//this is a comment",
  },
  {
    question: "Arrays in JavaScript can be stored in",
    choice1: "numbers and strings",
    choice2: "booleans",
    choice3: "other arrays",
    choice4: "all of the above",
  },
  {
    question: "Inside which HTML element do we put the JavaScript",
    choice1: "<javascript>",
    choice2: "<css>",
    choice3: "<scripts>",
    choice4: "<script>",
  },
  {
    question:
      "How do you write a conditional statement for executing statements if i is equal or less than 20?",
    choice1: "if i >== 20",
    choice2: "if i <== 20",
    choice3: "if (i >== 20)",
    choice4: "if (i <== 20)",
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innterText = "Question ${questionCounter} of ${MAX_QUESTIONS}";

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerTect = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

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

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeOut(() => {
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

function gameTimer() {
  var sec = 60;
  var time = setInterval(function () {
    document.getElementbyId("timeDisplay").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(time);
    }
  }, 1000);
}
