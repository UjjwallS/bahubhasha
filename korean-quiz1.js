

const questions = [
    {
        question: "7의 올바른 철자는 무엇입니까?",
        optionA: "수이이이이",
        optionB: "세븐",
        optionC: "세븐",
        optionD: "세완",
        correctOption: "optionB"
    },

    {
        question: "영어 알파벳은 몇 개인가요?",
        optionA: "이십이",
        optionB: "이십육",
        optionC: "이십칠",
        optionD: "이십사",
        correctOption: "optionB"
    },

    {
        question: "이 중 Exclaimetry 마크는 무엇인가요?",
        optionA: "?",
        optionB: ".",
        optionC: "-",
        optionD: "!",
        correctOption: "optionD"
    },

    {
        question: " A B C _ E F ?",
        optionA: "큐",
        optionB: "아르 자형",
        optionC: "디",
        optionD: "엘",
        correctOption: "optionC"
    },

    {
        question: " Thr_e, 적절한 단어를 입력해 보세요.",
        optionA: "N",
        optionB: "티",
        optionC: "아르 자형",
        optionD: "이자형",
        correctOption: "optionD"
    },

    {
        question: "U V W _ Y Z ?",
        optionA: "엑스",
        optionB: "큐",
        optionC: "G",
        optionD: "V",
        correctOption: "optionA"
    },

    {
        question: " 2:_______ ?",
        optionA: "삼",
        optionB: "아홉",
        optionC: "둘",
        optionD: "십사",
        correctOption: "optionC"
    },

    {
        question: " 4: 4개 :: _ : 아홉?",
        optionA: "9",
        optionB: "2",
        optionC: "1",
        optionD: "8",
        correctOption: "optionA"
    },

    {
        question: " 4 5 6 7 _ 9 ?",
        optionA: "하나",
        optionB: "열둘",
        optionC: "아홉",
        optionD: "여덟",
        correctOption: "optionD"
    },

    {
        question: "이_글리스_?",
        optionA: "n 승",
        optionB: "승",
        optionC: "에이씨",
        optionD: "시간",
        correctOption: "optionD"
    },


    {
        question: "__________에 대한 A",
        optionA: "안녕하세요",
        optionB: "공",
        optionC: "고양이",
        optionD: "안다 카레",
        correctOption: "optionD"
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
  