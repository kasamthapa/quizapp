// Quiz data (questions, options, correct answers)
const questions = [
    {
        number: 1,
        question: "नेपालको राजधानी शहर कुन हो?",
        correct: "क) काठमाडौं",
        options: [
            "क) काठमाडौं",
            "ख) पोखरा",
            "ग) गोरखा",
            "घ) ललितपुर",
        ]
    },
    {
        number: 2,
        question: "नेपालको राष्ट्रिय फूल कुन हो?",
        correct: "ख) लालीगुराँस",
        options: [
            "क) चमेली",
            "ख) लालीगुराँस",
            "ग) धुपी",
            "घ) सुनाखरी",
        ]
    },
    {
        number: 3,
        question: "नेपालको राष्ट्रिय जनावर कुन हो?",
        correct: "क) गाई",
        options: [
            "क) गाई",
            "ख) भैंसी",
            "ग) बाख्रा",
            "घ) हात्ती",
        ]
    },
    {
        number: 4,
        question: "सगरमाथाको उचाइ कति छ?",
        correct: "ख) ८,८४८.८६ मिटर",
        options: [
            "क) ८,८४८ मिटर",
            "ख) ८,८४८.८६ मिटर",
            "ग) ८,८५० मिटर",
            "घ) ८,८४७ मिटर",
        ]
    },
    {
        number: 5,
        question: "नेपालको राष्ट्रिय गीत कसले लेखेका हुन्?",
        correct: "घ) व्याकुल माइलो",
        options: [
            "क) भानुभक्त आचार्य",
            "ख) लक्ष्मीप्रसाद देवकोटा",
            "ग) प्रदीपकुमार राई",
            "घ) व्याकुल माइलो",
        ]
    },
    {
        number: 6,
        question: "नेपालका प्रथम राजा को हुन्?",
        correct: "क) पृथ्वीनारायण शाह",
        options: [
            "क) पृथ्वीनारायण शाह",
            "ख) महेन्द्र शाह",
            "ग) त्रिभुवन शाह",
            "घ) पृथ्वी बबर शाह",
        ],
    },
    {
        number: 7,
        question: "नेपालको राष्ट्रिय जनसङ्ख्या गणना कहिले हुन्छ?",
        correct: "ख) १० वर्षमा एकपटक",
        options: [
            "क) ५ वर्षमा एकपटक",
            "ख) १० वर्षमा एकपटक",
            "ग) १५ वर्षमा एकपटक",
            "घ) २० वर्षमा एकपटक",
        ],
    },
    {
        number: 8,
        question: "गौतम बुद्धको जन्मस्थान कुन हो?",
        correct: "ख) लुम्बिनी",
        options: [
            "क) कपिलवस्तु",
            "ख) लुम्बिनी",
            "ग) रामग्राम",
            "घ) देवदह",
        ],
    },
    {
        number: 9,
        question: "नेपालको राष्ट्रिय जनावर गाईको दिन कुन हो?",
        correct: "क) गाई तिहार",
        options: [
            "क) गाई तिहार",
            "ख) दशैं",
            "ग) छठ",
            "घ) नाग पञ्चमी",
        ],
    },
    {
        number: 10,
        question: "विश्वकै अग्लो हिमाल कुन हो?",
        correct: "क) सगरमाथा",
        options: [
            "क) सगरमाथा",
            "ख) मकालु",
            "ग) अन्नपूर्ण",
            "घ) कञ्चनजङ्घा",
        ],
    },
];

// Button elements and sections for managing quiz interactions
let startBtn = document.querySelector('.start-btn');
let exitBtn = document.querySelector('.exit-btn');
let main = document.querySelector('.main');
let continueBtn = document.querySelector(".continue-btn");
let nextBtn = document.querySelector('.next-btn');
let resultBox = document.querySelector('.result-box');
let tryAgain = document.querySelector('.try-again');
let goHome = document.querySelector('.go-home');
let quizSection = document.querySelector(".quiz-section");
let quizBox = document.querySelector('.quiz-box');
let homeBtn = document.querySelector('.logo');

// Start button event listener - shows the info popup
startBtn.addEventListener('click', () => {
    showInfo();
});

// Exit button event listener - hides the info popup
exitBtn.addEventListener('click', () => {
    hideInfo();
});

// Continue button event listener - starts the quiz
continueBtn.addEventListener('click', () => {
    quizSection.classList.add('active');
    document.querySelector('.pop-info').classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
});

// Try again button event listener - resets the quiz and shows first question
tryAgain.addEventListener('click', () => {
    resultBox.classList.remove('active');
    quizBox.classList.add('active');
    questionCount = 0;
    scoreCount = 0;
    nextBtn.style.pointerEvents = "none";  // Disable next button until an answer is selected
    showQuestions(questionCount);
    questionCounter(questionCount);
});

// Go home button event listener - exits the quiz section
goHome.addEventListener('click', () => {
    quizSection.classList.remove('active');
});

// Home button event listener - exits the quiz section
homeBtn.addEventListener('click', () => {
    quizSection.classList.remove('active');
});

// Show the info popup
function showInfo() {
    document.querySelector('.pop-info').classList.add('active');
    main.classList.add('active');
}

// Hide the info popup
function hideInfo() {
    document.querySelector('.pop-info').classList.remove('active');
    main.classList.remove('active');
}

let questionCount = 0;  // Tracks the current question index
let scoreCount = 0;  // Tracks the user's score

// Next button event listener - moves to the next question or shows result
nextBtn.addEventListener('click', () => {
    stopTimer();
    if (questionCount < questions.length) {
        questionCount++;
        showQuestions(questionCount);
        questionCounter(questionCount);
    } else {
        resultShow();
    }
});

// Function to display the current question and options
function showQuestions(index) {
    setTimer();
    // Shuffle options for randomness
    // questions.sort(() => Math.random() - 0.5);

    // Display question text
    let questionText = document.querySelector('.quiz-question');
    questionText.textContent = `${index + 1}. ${questions[index].question}`;

    // Display options
    let options = document.querySelector('.options');
    options.innerHTML = `
        <span class="option">${questions[index].options[0]}</span>
        <span class="option">${questions[index].options[1]}</span>
        <span class="option">${questions[index].options[2]}</span>
        <span class="option">${questions[index].options[3]}</span>
    `;

    // Add click event listeners to options
    document.querySelectorAll('.option').forEach((option) => {
        option.addEventListener('click', () => {
            answerCheck(option, index);
        });
    });

    // Display current score
    let score = document.querySelector('.score');
    score.textContent = `स्कोर: ${scoreCount}/${questions.length}`;
}

// Display the question counter (e.g., "1/10 प्रश्नहरू")
function questionCounter(n) {
    let questionNO = document.querySelector(".question-counter");
    questionNO.textContent = `${n + 1}/${questions.length} प्रश्नहरू`;
}

// Function to check the user's answer
function answerCheck(option, index) {
    let correctAns = questions[index].correct;
    let userAns = option.textContent;

    // Disable further clicks on options
    document.querySelectorAll('.option').forEach((opt) => {
        opt.style.pointerEvents = "none";
    });

    // Check if the selected answer is correct
    if (correctAns == userAns) {
        option.classList.add('correct');  // Highlight correct answer
        scoreCount++;  // Increase score
    } else {
        // Highlight the correct and incorrect options
        document.querySelectorAll('.option').forEach((opt) => {
            if (opt.textContent.trim() === correctAns) {
                opt.classList.add('correct');
                opt.style.pointerEvents = "none";
            } else {
                opt.classList.add('incorrect');
            }
        });
    }

    nextBtn.style.pointerEvents = "auto";  // Enable next button after selection
}

// Function to show the result after completing the quiz
function resultShow() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    let circularProgress = document.querySelector('.circular-progress');
    let circleScore = document.querySelector('.circular-score');
    let progressScore = document.querySelector('.progress-score');
    let progressStartValue = -1;
    let progressEndValue = (scoreCount / questions.length) * 100;

    // Animate circular progress bar
    let progress = setInterval(() => {
        progressStartValue++;
        circularProgress.style.background = `conic-gradient(#d40c77 ${progressStartValue * 3.6}deg, #727377 0deg)`;
        circleScore.textContent = `${progressStartValue}%`;

        // Stop the animation once the progress reaches the end
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }

        progressScore.textContent = `तपाईंले ${scoreCount}/${questions.length} स्कोर गर्नुभयो`;
    }, 20);
}

let timer; // Global variable to store timer reference
let timeLeft; // Global variable for time left

// Function to set up the timer for each question
function setTimer() {
    let timeDisplay = document.querySelector('.timer');
    timeLeft = 15; // Timer set to 15 seconds for each question
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Timer: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.click();  // Automatically move to next question when time is up
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}
