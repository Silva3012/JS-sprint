// Select HTML elements and assign them to variables
const startScreenElement = document.querySelector(".start");
const startButton = document.querySelector("#start-button");
const questionsElement = document.querySelector("#questions");
const timerElement = document.querySelector("#time");
const titleElement = document.querySelector("#question-title");
const feedbackElement = document.querySelector("#feedback");
const choicesElement = document.querySelector("#choices");
const endScreenElement = document.querySelector("#end-screen");
const finalScoreElement = document.querySelector("#final-score");
const submitButtonElement = document.querySelector("#submit");
const initialsElement = document.querySelector("#initials");

// Sounds
const correctSound = new Audio('assets/sfx/correct.wav');
const incorrectSound = new Audio('assets/sfx/incorrect.wav')

// Variables that keep track of the quizzes state
let time = questions.length * 15;
let questionIndex = 0;
let timerId;

// A function that starts the quiz, by hiding the start screen and getting a question and also starting the timer
const startTheQuiz = () => {
    // Hide the start screen by adding "hide" as a value to the class
    startScreenElement.classList.add("hide");

    // Un-hide questions by removing the class attribute
    questionsElement.classList.remove("hide");

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
        // Add a class to the choice button
        choiceButton.classList.add("choice-button");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + '.' + choice;
        // Create a line break element
        let lineBreak = document.createElement("br");

        // Display on the page
        choicesElement.appendChild(choiceButton);
        choicesElement.appendChild(lineBreak);

    }

}

// This function will handle user interaction when an answer has been clicked
const handleAnswerClick = (e) => {
    // assign a target element to a variable for the choice buttons
    let choiceButton = e.target;

    // Check if the users answer is correct
    if (choiceButton.value === questions[questionIndex].answer) {
       // Show correct feedback and play the correct sound effect
        feedbackElement.textContent = "Correct answer!";
        correctSound.play();
    } else {
        // Reduce the time by 15 seconds, play incorrect sound show wrong feedback
        time -= 15;
        feedbackElement.textContent = "Wrong answer!";
        incorrectSound.play();

        if (time < 0) {
            time = 0;
        }

        // Display new time on a page
        timerElement.textContent = time;
    }

    // Show right or wrong on the page for a second
    feedbackElement.classList.remove("hide");
    setTimeout(function() {
        feedbackElement.classList.add("hide");
    }, 1000);

    // Move to the next question
    questionIndex++

    // Check if we still have questions and fetch the next question or end the quiz
    if (time <= 0 || questionIndex === questions.length) {
        endTheQuiz();
    } else {
        fetchQuestion();
    }

}

// This function will end the quiz by clearing the timer, showing the end screen, show the final score and hiding the questions section
const endTheQuiz = () => {
    // clear/stop the time
    clearInterval(timerId);

    // End screen
    endScreenElement.classList.remove("hide");

    // Hide questions
    questionsElement.classList.add("hide");

    // Show final score
    finalScoreElement.textContent = time;

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

// This function will save the users highscores and store it in local storage
const saveUserHighScore = () => {
    // Get a trimmed value of the users input
    let initials = initialsElement.value.trim();

    // If initials is true get saved ones from localstorage or set to an empty array
    if (initials !== "") {
        let highScores = JSON.parse(window.localStorage.getItem("high-scores")) || [];

        // Create and format a score and initial object for the current user
        let scoreAndInitials = {
            score: time,
            initials: initials,
        };

        // Save to local storage
        highScores.push(scoreAndInitials);
        window.localStorage.setItem("high-scores", JSON.stringify(highScores));

        // Redirect to the high score page
        window.location.href = "highscores.html";
    }
}


// On click event to start the quiz
startButton.onclick = startTheQuiz;

// Choices on click event
choicesElement.onclick = handleAnswerClick;

// Submit initials with score
submitButtonElement.onclick = saveUserHighScore;