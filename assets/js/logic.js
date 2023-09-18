// Select HTML elements and assign them to variables
const startScreenElement = document.querySelector(".start");
const startButton = document.querySelector("#start-button");
const questionsElement = document.querySelector("#questions")
const timerElement = document.querySelector("#time");

// Variables that keep track of the quizzes state
let time = questions.length * 15;
let questionIndex = 0;
let timerId;

// A function that starts the quiz, by hiding the start screen and getting a question and also starting the timer
const startTheQuiz = () => {
    // Hide the start screen by adding "hide" as a value to the class
    startScreenElement.setAttribute("class", "hide");

    // Un-hide questions by removing the class attribute
    questionsElement.removeAttribute("class");

    // Start the timer
    timerId = setInterval(clockTimer, 1000)
}

// This function is responsible for updating the time and checking if the user has ran out of time
const clockTimer = () => {
    // Updating the time
    time--;
    timerElement.textContent = time;

    // Check if the user still has time, if not, end the quiz
    if (time <= 0) {
        endTheQuiz();
    }

}
// On click event to start the quiz
startButton.onclick = startTheQuiz();