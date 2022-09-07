// Variables defined with quiz questions and answers
var quizQuestions = [
    {
        question: "What does DOM stand for?",
        options: ["Domestic Object Module", "Document Object Model", "Desert Oasis Method", "Document Other Mode"],
        correctAnswer: "Document Object Model"
    },

    {
        question: "The Math.random( ) function generates a number between:",
        options: ["1 and 100", "0 and 50", "1 and 2", "0 and 1"],
        correctAnswer: "0 and 1"
    },

    {
        question: "Which of these is NOT an acceptable variable name",
        options: ["user", "userName", "user name", "user-name"],
        correctAnswer: "user name"
    },

    {
        question: "Which of the following is a logical operator?",
        options: ["!", "||", "&&", "all of the above"],
        correctAnswer: "all of the above"
    },
];

// Define other variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 91;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Press "Start Quiz" button to start the timer, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                complete();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and answer options to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Loop through all questions in array
    for (var i = 0; i < quizQuestions.length; i++) {
        // Appends questions only
        var userQuestion = quizQuestions[questionIndex].question;
        var userChoices = quizQuestions[questionIndex].options;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question option
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare option with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == quizQuestions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + quizQuestions[questionIndex].correctAnswer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The correct answer is:  " + quizQuestions[questionIndex].correctAnswer;
        }

    }
    
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= quizQuestions.length) {
        // All done will append last page with user stats
        complete();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + quizQuestions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

// All done will append last page
function complete() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Complete!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // text Enter Your Initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input box for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit your high score
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}