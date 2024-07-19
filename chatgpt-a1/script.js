const questions = [
  {
    id: 1,
    question:
      "What is the correct syntax for referring to an external script called 'script.js'?",
    options: [
      "<script src='script.js'>",
      "<script href='script.js'>",
      "<script name='script.js'>",
      "<script file='script.js'>",
    ],
    answer: "<script src='script.js'>",
  },
  {
    id: 2,
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction()",
      "function:myFunction()",
      "create function myFunction()",
      "func myFunction()",
    ],
    answer: "function myFunction()",
  },
  {
    id: 3,
    question: "What does 'console.log' do in JavaScript?",
    options: [
      "Displays a message in the console",
      "Saves data to a file",
      "Alerts a message to the user",
      "Prints a message to the screen",
    ],
    answer: "Displays a message in the console",
  },
  {
    id: 4,
    question: "How do you declare a variable in JavaScript?",
    options: ["var myVar", "variable myVar", "declare myVar", "let myVar"],
    answer: "var myVar",
  },
  {
    id: 5,
    question:
      "Which operator is used to compare two values for equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    id: 6,
    question: "How do you add a comment in JavaScript?",
    options: [
      "// This is a comment",
      "# This is a comment",
      "/* This is a comment */",
      "-- This is a comment",
    ],
    answer: "// This is a comment",
  },
  {
    id: 7,
    question: "What is the purpose of the 'return' statement in a function?",
    options: [
      "To exit the function",
      "To return a value from the function",
      "To call another function",
      "To repeat the function",
    ],
    answer: "To return a value from the function",
  },
  {
    id: 8,
    question: "How can you concatenate two strings in JavaScript?",
    options: [
      "string1 + string2",
      "string1 & string2",
      "string1.concat(string2)",
      "string1.add(string2)",
    ],
    answer: "string1 + string2",
  },
  {
    id: 9,
    question:
      "What keyword is used to define a constant variable in JavaScript?",
    options: ["const", "let", "var", "define"],
    answer: "const",
  },
  {
    id: 10,
    question:
      "Which method can be used to find the length of an array in JavaScript?",
    options: ["array.length", "array.size()", "array.count", "array.length()"],
    answer: "array.length",
  },
]

let currentQuestionIndex = 0
let score = 0
let questionStartTime = 0
let timeTaken = []
let incorrectAnswers = []

function showQuestion(question) {
  const questionElement = document.getElementById("question")
  const optionsElement = document.getElementById("options")
  questionElement.innerText = question.question
  optionsElement.innerHTML = ""

  questionStartTime = Date.now() // Record the time when the question is displayed

  question.options.forEach((option) => {
    const button = document.createElement("button")
    button.innerText = option
    button.classList.add("option-button")
    button.addEventListener("click", () =>
      handleAnswer(option, question.answer)
    )
    optionsElement.appendChild(button)
  })
}

function handleAnswer(selectedOption, correctAnswer) {
  const questionEndTime = Date.now() // Record the time when the answer is selected
  const timeTakenForQuestion = (questionEndTime - questionStartTime) / 1000 // Time in seconds
  timeTaken.push(timeTakenForQuestion)

  if (selectedOption === correctAnswer) {
    score++
  } else {
    incorrectAnswers.push({
      question: questions[currentQuestionIndex].question,
      userAnswer: selectedOption,
      correctAnswer: correctAnswer,
    })
  }

  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex])
  } else {
    showResult()
  }
}
function showResult() {
  const resultElement = document.getElementById("result")
  const summaryElement = document.getElementById("summary")

  const totalTime = timeTaken.reduce((a, b) => a + b, 0).toFixed(2) // Total time taken
  resultElement.innerHTML = `Quiz finished! Your score is ${score} out of ${questions.length}.<br> 
                             Total time taken: ${totalTime} seconds.`

  if (incorrectAnswers.length > 0) {
    let summaryHTML = "<h2>Summary of Incorrect Answers:</h2>"
    incorrectAnswers.forEach((answer) => {
      summaryHTML += `
        <div class="summary-item">
          <h3>Question:</h3>
          <p class="question">${answer.question}</p>
          <h3>Your Answer:</h3>
          <p class="answer user-answer">${answer.userAnswer}</p>
          <h3>Correct Answer:</h3>
          <p class="answer correct-answer">${answer.correctAnswer}</p>
        </div>
      `
    })
    summaryElement.innerHTML = summaryHTML
  } else {
    summaryElement.innerHTML =
      "<p>Great job! You answered all questions correctly.</p>"
  }

  document.getElementById("question-container").style.display = "none"
  document.getElementById("next-button").style.display = "none"
}

// Initialize the quiz
showQuestion(questions[currentQuestionIndex])
