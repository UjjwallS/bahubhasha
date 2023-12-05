

const questions = [
    {
        question: "What is the plural form of 'child' ?",
        optionA: "Childs",
        optionB: "Childen",
        optionC: "Children",
        optionD: "Childies",
        correctOption: "optionC"
    },

    {
        question: "Which word is a synonym for 'Happy' ?",
        optionA: "Sad",
        optionB: "Angry",
        optionC: "Joyful",
        optionD: "Tired",
        correctOption: "optionC"
    },

    {
        question: "What is the past tense of 'Eat' ?",
        optionA: "Ate",
        optionB: "Eaten",
        optionC: "Eating",
        optionD: "Eats",
        correctOption: "optionA"
    },

    {
        question: "Choose the correct sentence?",
        optionA: "She don't like coffee.",
        optionB: "She doesn't like coffee.",
        optionC: "She doesn't likes coffee.",
        optionD: "She not like coffee.",
        correctOption: "optionB"
    },

    {
        question: "What is the opposite of 'Small' ?",
        optionA: "Large",
        optionB: "Tiny",
        optionC: "Little",
        optionD: "Minuscule",
        correctOption: "optionA"
    },

    {
        question: "Which sentence is in the future tense ?",
        optionA: "She is singing a song",
        optionB: "She sang a song",
        optionC: "She sings a song",
        optionD: "She will sing a song",
        correctOption: "optionA"
    },

    {
        question: "What is a plural of 'Mouse' ?",
        optionA: "Mice",
        optionB: "Mouses",
        optionC: "Mooses",
        optionD: "Meece",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is a preposition ?",
        optionA: "Run",
        optionB: "On",
        optionC: "Jump",
        optionD: "Fast",
        correctOption: "optionB"
    },

    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionD"
    },

    {
        question: `"What is the comparative form of 'good'"? `,
        optionA: "Best",
        optionB: "Gooder",
        optionC: "More good",
        optionD: "Better",
        correctOption: "optionD"
    },

    {
        question: " Which word is a pronoun ?",
        optionA: "Jump",
        optionB: "She",
        optionC: "Delicious",
        optionD: "Quickly",
        correctOption: "optionB"
    }
]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })


    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
   
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

   
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none";
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none";
}

function redirectToPage() {
    window.location.href = 'http://127.0.0.1:5500/quizzes/english/english-quiz.html';
  }
  