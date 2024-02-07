const questions = [
    {
        question: "Which is the largest country in the world?",
        answers: [
            { text: "India", correct: false},
            { text: "China", correct: false},
            { text: "Japan", correct: false},
            { text: "Russia", correct: true}
        ]
    },
    {
        question: "Which bank is called bankers Bank of India?",
        answers: [
            { text: "State Bank of India", correct: false},
            { text: "Punjab National Bank", correct: false},
            { text: "Reserve Bank of India", correct: true},
            { text: "ICICI Bank", correct: false}
        ]
    },
    {
        question: "Which is the biggest continent in the world?",
        answers: [
            { text: "Asia", correct: true},
            { text: "North America", correct: false},
            { text: "Africa", correct: false},
            { text: "Australia", correct: false}
        ]
    },
    {
        question: "Which is largest animal on land?",
        answers: [
            { text: "Tiger", correct: false},
            { text: "White Elephant", correct: false},
            { text: "African Elephant", correct: true},
            { text: "Crocodile", correct: false}
        ]
    },
    {
        question: "Which is largest island in the world?",
        answers: [
            { text: "New Guinea", correct: false},
            { text: "Hawaii", correct: false},
            { text: "Andaman Nicobar", correct: false},
            { text: "Greenland", correct: true}
        ]
    },
    {
        question: "The Moon is the natural satellite of which planet?",
        answers: [
            { text: "Mercury", correct: false},
            { text: "The Earth", correct: true},
            { text: "Venus", correct: false},
            { text: "Pluto", correct: false}
        ]
    }
];

const question = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;   

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", event =>{
            const selectedBtn = event.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if(isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            }
            else {
                selectedBtn.classList.add("incorrect");
            }

            Array.from(answerBtn.children).forEach(button => {
                if(button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextBtn.style.display = "block";
        })
    });
}

function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

startQuiz();