

const questions = [
    {
        question: "Quel est le pluriel de « enfant » ?",
        optionA: "Enfan",
        optionB: "Enefant",
        optionC: "Enfants",
        optionD: "Efants",
        correctOption: "optionC"
    },

    {
        question: "Quel mot est synonyme de « Heureux » ?",
        optionA: "Triste",
        optionB: "En colère",
        optionC: "Joyeux",
        optionD: "Fatigué",
        correctOption: "optionC"
    },

    {
        question: "Quel est le passé de « Manger » ?",
        optionA: "A mangé",
        optionB: "Mangé",
        optionC: "Manger",
        optionD: "Eats",
        correctOption: "optionA"
    },

    {
        question: "Choisir la phrase correcte?",
        optionA: "Elle n'aime pas le café.",
        optionB: "Elle n'aime pas le café.",
        optionC: "Elle n'aime pas le café.",
        optionD: "Elle n'aime pas le café.",
        correctOption: "optionB"
    },

    {
        question: "Quel est l'inverse de 'Petit' ?",
        optionA: "Grand",
        optionB: "Minuscule",
        optionC: "Petit",
        optionD: "Minuscule",
        correctOption: "optionA"
    },

    {
        question: "Quelle phrase est au futur ?",
        optionA: "Elle chante une chanson",
        optionB: "Elle a chanté une chanson",
        optionC: "Elle chante une chanson",
        optionD: "Elle chantera une chanson",
        correctOption: "optionA"
    },

    {
        question: "Quel est le pluriel de « Souris » ?",
        optionA: "Souris",
        optionB: "Sou",
        optionC: "Sour",
        optionD: "Soup",
        correctOption: "optionA"
    },

    {
        question: "Lequel des énoncés suivants est une préposition ?",
        optionA: "Courir",
        optionB: "Sur",
        optionC: "Saut",
        optionD: "Rapide",
        correctOption: "optionB"
    },

    {
        question: "Lequel de ces nombres est impair ?",
        optionA: "Dix",
        optionB: "Douze",
        optionC: "Huit",
        optionD: "Onze",
        correctOption: "optionD"
    },

    {
        question: `"Quelle est la forme comparative de « bien »" `,
        optionA: "Meilleur",
        optionB: "Plus bon",
        optionC: "Meilleur",
        optionD: "Mieux",
        correctOption: "optionD"
    },

    {
        question: " Quel mot est un pronom ?",
        optionA: "Saut",
        optionB: "Elle",
        optionC: "Délicieux",
        optionD: "Rapidement",
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
  