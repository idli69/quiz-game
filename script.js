// Utilities
const $ = (id) => document.getElementById(id);

// Elements
const startScreen = $("start-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");
const startButton = $("start-btn");
const questionText = $("question-text");
const answerContainer = $("answers-container");
const currentQuestionSpan = $("current-question");
const totalQuestionSpan = $("total-questions");
const scoreSpan = $("score");
const finalScoreSpan = $("final-score");
const maxScoreSpan = $("max-score");
const resultMessage = $("result-message");
const restartButton = $("restart-btn");
const progressBar = $("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "Which planet has a day longer than its year?",
    answers: [
      { text: "Venus", correct: true },
      { text: "Mars", correct: false },
      { text: "Mercury", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "How many hearts does an octopus have?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
    ],
  },
  {
    question: "Which planet rains diamonds?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
      { text: "Mercury", correct: false },
      { text: "Neptune", correct: true },
    ],
  },
  {
    question: "Which is the only mammal capable of true powered flight?",
    answers: [
      { text: "Flying Squirrel", correct: false },
      { text: "Bat", correct: true },
      { text: "Sugar Glider", correct: false },
      { text: "Flying Fox", correct: false },
    ],
  },
  {
    question: "What was discovered before Antarctica?",
    answers: [
      { text: "The Pacific Ocean", correct: false },
      { text: "The Amazon River", correct: false },
      { text: "The Sahara Desert", correct: false },
      { text: "The planet Neptune", correct: true },
    ],
  },
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Functions
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answerContainer.innerHTML = "";

  // Render answers
  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer.text;
    btn.dataset.correct = answer.correct;

    btn.addEventListener("click", selectAnswer);

    answerContainer.appendChild(btn);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Apply classes to all answers
  Array.from(answerContainer.children).forEach((btn) => {
    btn.disabled = true;

    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selectedButton) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
