

const questions = [
    {
        question: "'아이'의 복수형은 무엇입니까?",
        optionA: "차일즈",
        optionB: "어린이들",
        optionC: "어린이들",
        optionD: "어린이",
        correctOption: "optionC"
    },

    {
        question: "'행복하다'의 동의어는 무엇인가요?",
        optionA: "슬퍼",
        optionB: "화난",
        optionC: "즐거운",
        optionD: "피곤한",
        correctOption: "optionC"
    },

    {
        question: "'먹다'의 과거형은 무엇인가요?",
        optionA: "먹었다",
        optionB: "먹다",
        optionC: "식사",
        optionD: "먹는다",
        correctOption: "optionA"
    },

    {
        question: "맞는 문장을 고르시 오?",
        optionA: "그녀는 커피를 좋아하지 않습니다.",
        optionB: "그녀는 커피를 좋아하지 않습니다.",
        optionC: "그녀는 커피를 좋아하지 않습니다.",
        optionD: "그녀는 커피를 좋아하지 않습니다.",
        correctOption: "optionB"
    },

    {
        question: "'소'의 반대말은 무엇인가요?",
        optionA: "크기가 큰",
        optionB: "매우 작은",
        optionC: "작은",
        optionD: "소문자",
        correctOption: "optionA"
    },

    {
        question: "어떤 문장이 미래형인가요?",
        optionA: "그녀는 노래를 부르고 있다",
        optionB: "그녀는 노래를 불렀다",
        optionC: "그녀는 노래를 부른다",
        optionD: "그녀는 노래를 부를 것이다",
        correctOption: "optionA"
    },

    {
        question: "'마우스'의 복수형은 무엇입니까?",
        optionA: "쥐",
        optionB: "생쥐",
        optionC: "무스",
        optionD: "미스",
        correctOption: "optionA"
    },

    {
        question: "다음 중 전치사는 무엇입니까?",
        optionA: "달리다",
        optionB: "~에",
        optionC: "도약",
        optionD: "빠른",
        correctOption: "optionB"
    },

    {
        question: "다음 중 어느 숫자가 홀수인가요?",
        optionA: "십",
        optionB: "열둘",
        optionC: "여덟",
        optionD: "열하나",
        correctOption: "optionD"
    },

    {
        question: `"'좋다'의 비교급은 무엇인가요?"? `,
        optionA: "최상의",
        optionB: "구더",
        optionC: "더 좋은",
        optionD: "더 나은",
        correctOption: "optionD"
    },

    {
        question: " 어떤 단어가 대명사인가요?",
        optionA: "도약",
        optionB: "그녀",
        optionC: "맛있는",
        optionD: "빠르게",
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
  