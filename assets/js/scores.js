// Function to display highscores
const displayScores = () => {
    // Get the scores from local storage or set to an empty array
    let highScores = JSON.parse(window.localStorage.getItem('high-scores')) || [];

    // Sort the scores by descending order
    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    for (let i = 0; i < highScores.length; i++) {
        // Create a li tag for each score
        let listTag = document.createElement("li");
        listTag.textContent = `${highScores[i].initials} : ${highScores[i].score}`;

        // Show on the page
        let orderedListTag = document.querySelector("#high-scores");
        orderedListTag.appendChild(listTag);
    }
}

// Function to clear the scores
const clearScores = () => {
    window.localStorage.removeItem("high-scores");
    window.location.reload();
}

document.querySelector("#clear").onclick = clearScores();

displayScores();