// Selecting elements
const splashScreen = document.getElementById("splash-screen");
const levelButtons = document.querySelectorAll(".level-button");
const gameContainer = document.getElementById("game-container");
const scoreBoard = document.getElementById("score-board");
const currentScoreDisplay = document.getElementById("current-score");
const topScoreDisplay = document.getElementById("top-score");
const progressIndicator = document.getElementById("progress-indicator");
const progressText = document.getElementById("progress-text");
const questionDisplay = document.getElementById("math-question");
const answerButtons = document.querySelectorAll(".answer-button");
const gameOverScreen = document.getElementById("game-over-screen");
const restartButton = document.getElementById("restart-button");
const finalScoreDisplay = document.getElementById("final-score");

// Game variables
let currentScore = 0;
let topScore = 0;
let totalQuestions = 10;
let currentQuestionIndex = 0;
let correctAnswer = 0;
let currentLevel = "";

// Utility function to generate a random number with decimals
function getRandomDecimal(min, max, decimalPlaces) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}

// Utility function to generate a math question
function generateQuestion() {
    let a, b, result;

    if (currentLevel === "5th") {
        const num1 = getRandomDecimal(1, 10, 1);
        const num2 = getRandomDecimal(1, 10, 1);
        const isAddition = Math.random() > 0.5;
        correctAnswer = isAddition ? num1 + num2 : num1 - num2;
        questionDisplay.textContent = `What is ${num1} ${isAddition ? "+" : "-"} ${num2}?`;

        const correctButtonIndex = Math.floor(Math.random() * answerButtons.length);
        answerButtons.forEach((button, index) => {
            const potentialAnswer = correctAnswer + (index - correctButtonIndex);
            button.textContent = potentialAnswer >= 0 ? potentialAnswer.toFixed(1) : Math.abs(potentialAnswer).toFixed(1);
        });
    } else if (currentLevel === "prealgebra") {
        a = Math.floor(Math.random() * 5) + 1; // Random coefficient for 'a'
        b = Math.floor(Math.random() * 5) + 1; // Random coefficient for 'b'
        result = 16; // Fixed result for the equation
        correctAnswer = { a: 3, b: 2 }; // Hardcoded answers for prealgebra
        questionDisplay.textContent = `Solve for a and b: ${a}a + ${b}b = ${result}`;

        const correctButtonIndex = Math.floor(Math.random() * answerButtons.length);
        answerButtons.forEach((button, index) => {
            if (index === correctButtonIndex) {
                button.textContent = `a = 3, b = 2`; // Correct answer button
            } else {
                button.textContent = `a = 2, b = 3`; // Incorrect answer button
            }
        });
    }
}

// Start game function
function startGame(level) {
    currentLevel = level;
    splashScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameContainer.style.display = "flex";
    currentScore = 0;
    currentQuestionIndex = 0;
    updateScore();
    updateProgress();
    generateQuestion();
}

// Handle answer selection
answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedAnswer = button.textContent;
        if (selectedAnswer === `a = 3, b = 2`) {
            currentScore++;
        }
        currentQuestionIndex++;
        updateScore();
        updateProgress();

        if (currentQuestionIndex >= totalQuestions) {
            endGame();
        } else {
            generateQuestion();
        }
    });
});

// Update score display
function updateScore() {
    currentScoreDisplay.textContent = `Score: ${currentScore}`;
    if (currentScore > topScore) {
        topScore = currentScore;
    }
    topScoreDisplay.textContent = `Top Score: ${topScore}`;
}

// Update progress display
function updateProgress() {
    const progress = Math.floor((currentQuestionIndex / totalQuestions) * 100);
    progressText.textContent = `Progress: ${progress}%`;
}

// End game function
function endGame() {
    gameContainer.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScoreDisplay.textContent = currentScore;
}

// Restart game
restartButton.addEventListener("click", () => startGame(currentLevel));

// Event listeners to start the game with selected level
levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        const level = button.getAttribute("data-level");
        startGame(level);
    });
});