

const questions = [
    {
        question: "¿Cuál es la forma plural de 'niño'?",
        optionA: "Niños",
        optionB: "Niños",
        optionC: "Niños",
        optionD: "Niños",
        correctOption: "optionC"
    },

    {
        question: "¿Qué palabra es sinónimo de feliz?",
        optionA: "Triste",
        optionB: "Enojado",
        optionC: "Alegre",
        optionD: "Cansado",
        correctOption: "optionC"
    },

    {
        question: "¿Cuál es el tiempo pasado de 'Comer'?",
        optionA: "Comió",
        optionB: "Comido",
        optionC: "Comiendo",
        optionD: "Come",
        correctOption: "optionA"
    },

    {
        question: "¿Elija la frase correcta?",
        optionA: "A ella no le gusta el café.",
        optionB: "A ella no le gusta el café.",
        optionC: "A ella no le gusta el café.",
        optionD: "A ella no le gusta el café.",
        correctOption: "optionB"
    },

    {
        question: "¿Qué es lo contrario de 'Pequeño'?",
        optionA: "Grande",
        optionB: "Diminuto",
        optionC: "Pequeño",
        optionD: "Minúscula",
        correctOption: "optionA"
    },

    {
        question: "¿Qué oración está en tiempo futuro?",
        optionA: "ella esta cantando una cancion",
        optionB: "Ella cantó una cancion",
        optionC: "ella canta una canción",
        optionD: "ella cantará una canción",
        correctOption: "optionA"
    },

    {
        question: "¿Qué es el plural de 'Ratón'?",
        optionA: "Ratones",
        optionB: "Ratón",
        optionC: "alces",
        optionD: "meece",
        correctOption: "optionA"
    },

    {
        question: "¿Cuál de las siguientes es una preposición?",
        optionA: "Correr",
        optionB: "En",
        optionC: "Saltar",
        optionD: "Rápido",
        correctOption: "optionB"
    },

    {
        question: "¿Cuál de estos números es un número impar?",
        optionA: "Diez",
        optionB: "Doce",
        optionC: "Ocho",
        optionD: "Once",
        correctOption: "optionD"
    },

    {
        question: `"¿Cuál es la forma comparativa de "bueno"?"? `,
        optionA: "El mejor",
        optionB: "Bueno",
        optionC: "Mas bueno",
        optionD: "Mejor",
        correctOption: "optionD"
    },

    {
        question: " ¿Qué palabra es un pronombre?",
        optionA: "Saltar",
        optionB: "Ella",
        optionC: "Delicioso",
        optionD: "Rápidamente",
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
  