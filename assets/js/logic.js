// Select HTML elements and assign them to variables
const startScreenElement = document.querySelector(".start");
const startButton = document.querySelector("#start-button");
const questionsElement = document.querySelector("#questions");
const timerElement = document.querySelector("#time");
const titleElement = document.querySelector("#question-title");
const choicesElement = document.querySelector("#choices");

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

    // Show starting time
    timerElement.textContent = time;

    fetchQuestion();
}

// A function that fetches a question from the questions array
const fetchQuestion = () => {
    // fetch a question object
    let question = questions[questionIndex]

    // Extract the title from the question object and update the element
    titleElement.textContent = question.title;

    // Clear out old question choices
    choicesElement.innerHTML = '';

    // Loop over the array of choices and also create a button for each choice
    for (let i = 0; i < question.choices.length; i++) {
        let choice = question.choices[i];
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choices");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + '.' + choice;
        // Create a line break element
        let lineBreak = document.createElement("br");

        // Display on the page
        choicesElement.appendChild(choiceButton);
        choicesElement.appendChild(lineBreak);

    }

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