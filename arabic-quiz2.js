

const questions = [
    {
        question: "ما هي صيغة الجمع لكلمة "طفل"؟",
        optionA: "تشايلدز",
        optionB: "أطفال",
        optionC: "أطفال",
        optionD: "تشايلديز",
        correctOption: "optionC"
    },

    {
        question: "ما هي الكلمة المرادفة لكلمة "سعيد"؟",
        optionA: "حزين",
        optionB: "غاضب",
        optionC: "بهيجة",
        optionD: "مرهق",
        correctOption: "optionC"
    },

    {
        question: "ما هو الفعل الماضي من "أكل"؟",
        optionA: "أكل",
        optionB: "أكل",
        optionC: "يتناول الطعام",
        optionD: "يأكل",
        correctOption: "optionA"
    },

    {
        question: "اختر الجملة الصحيحة؟",
        optionA: "إنها لا تحب القهوة.",
        optionB: "إنها لا تحب القهوة.",
        optionC: "إنها لا تحب القهوة.",
        optionD: "إنها لا تحب القهوة.",
        correctOption: "optionB"
    },

    {
        question: "ما هو عكس "الصغير"؟",
        optionA: "كبير",
        optionB: "صغير الحجم",
        optionC: "قليل",
        optionD: "جزء صغير، ضئيل",
        correctOption: "optionA"
    },

    {
        question: "ما هي الجملة في زمن المستقبل؟",
        optionA: "إنها تغني أغنية",
        optionB: "غنت أغنية",
        optionC: "إنها تغني أغنية",
        optionD: "سوف تغني أغنية",
        correctOption: "optionA"
    },

    {
        question: "ما هو جمع "الماوس"؟",
        optionA: "الفئران",
        optionB: "الفأر",
        optionC: "الموس",
        optionD: "ميس",
        correctOption: "optionA"
    },

    {
        question: "أي مما يلي يعتبر حرف جر؟",
        optionA: "يجري",
        optionB: "على",
        optionC: "القفز",
        optionD: "سريع",
        correctOption: "optionB"
    },

    {
        question: "أي من هذه الأرقام هو رقم فردي؟",
        optionA: "عشرة",
        optionB: "اثني عشر",
        optionC: "ثمانية",
        optionD: "أحد عشر",
        correctOption: "optionD"
    },

    {
        question: `"ما هو الشكل المقارن لكلمة "جيد""؟`,
        optionA: "أفضل",
        optionB: "جيد",
        optionC: "أفضل بكثير",
        optionD: "أحسن",
        correctOption: "optionD"
    },

    {
        question: " أي كلمة هي الضمير؟",
        optionA: "القفز",
        optionB: "هي",
        optionC: "لذيذ",
        optionD: "بسرعة",
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
  