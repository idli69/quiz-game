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
    question: "What is the fastest thing in the universe?",
    answers: [
      { text: "Light", correct: true },
      { text: "Sound", correct: false },
      { text: "Gravity", correct: false },
      { text: "Neutrinos", correct: false },
    ],
  },
  {
    question: "How many bones does a shark have?",
    answers: [
      { text: "206", correct: false },
      { text: "0", correct: true },
      { text: "50", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "What percentage of human DNA is shared with a banana?",
    answers: [
      { text: "25%", correct: false },
      { text: "50%", correct: true },
      { text: "75%", correct: false },
      { text: "10%", correct: false },
    ],
  },
  {
    question: "Which planet has the tallest volcano in the solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What color is a mirror?",
    answers: [
      { text: "Silver", correct: false },
      { text: "White", correct: false },
      { text: "Green", correct: true },
      { text: "Gray", correct: false },
    ],
  },
  {
    question: "How hot is a lightning bolt?",
    answers: [
      { text: "1,000°C", correct: false },
      { text: "5,000°C", correct: false },
      { text: "30,000°C", correct: true },
      { text: "10,000°C", correct: false },
    ],
  },
  {
    question: "What is the only rock that floats on water?",
    answers: [
      { text: "Limestone", correct: false },
      { text: "Obsidian", correct: false },
      { text: "Pumice", correct: true },
      { text: "Granite", correct: false },
    ],
  },
  {
    question: "How many atoms are in a grain of sand?",
    answers: [
      { text: "Millions", correct: false },
      { text: "Billions", correct: false },
      { text: "Quadrillions", correct: true },
      { text: "Trillions", correct: false },
    ],
  },
  {
    question: "What is the loudest animal on Earth relative to its size?",
    answers: [
      { text: "Blue Whale", correct: false },
      { text: "Pistol Shrimp", correct: true },
      { text: "Howler Monkey", correct: false },
      { text: "Sperm Whale", correct: false },
    ],
  },
  {
    question: "Which element has the highest melting point?",
    answers: [
      { text: "Iron", correct: false },
      { text: "Carbon", correct: false },
      { text: "Tungsten", correct: true },
      { text: "Titanium", correct: false },
    ],
  },
  {
    question: "How long does it take light to travel from the Sun to Earth?",
    answers: [
      { text: "1 second", correct: false },
      { text: "8 minutes", correct: true },
      { text: "1 hour", correct: false },
      { text: "30 seconds", correct: false },
    ],
  },
  {
    question: "What is the smallest unit of matter?",
    answers: [
      { text: "Atom", correct: false },
      { text: "Electron", correct: false },
      { text: "Quark", correct: true },
      { text: "Proton", correct: false },
    ],
  },
  {
    question: "Which organ has no pain receptors?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: false },
      { text: "Brain", correct: true },
      { text: "Lungs", correct: false },
    ],
  },
  {
    question: "What is the most abundant gas in Earth's atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Argon", correct: false },
    ],
  },
  {
    question: "How many times does your heart beat in a lifetime?",
    answers: [
      { text: "500 million", correct: false },
      { text: "2.5 billion", correct: true },
      { text: "1 billion", correct: false },
      { text: "100 million", correct: false },
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
