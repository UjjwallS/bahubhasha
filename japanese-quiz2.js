

const questions = [
    {
        question: "「子供」の複数形は何ですか?",
        optionA: "チャイルズ",
        optionB: "子供たち",
        optionC: "子供たち",
        optionD: "チャイルド",
        correctOption: "optionC"
    },

    {
        question: "「幸せ」の同義語はどれですか?",
        optionA: "悲しい",
        optionB: "怒り",
        optionC: "楽しげ",
        optionD: "疲れた",
        correctOption: "optionC"
    },

    {
        question: "「食べる」の過去形は何ですか？",
        optionA: "食べた",
        optionB: "食べた",
        optionC: "食べる",
        optionD: "食べる",
        correctOption: "optionA"
    },

    {
        question: "正しい文を選びなさい？",
        optionA: "彼女はコーヒーが好きではありません。",
        optionB: "彼女はコーヒーが好きではありません。",
        optionC: "彼女はコーヒーが好きではありません。",
        optionD: "彼女はコーヒーが好きではありません。",
        correctOption: "optionB"
    },

    {
        question: "「小さい」の反対は何ですか?",
        optionA: "大きい",
        optionB: "小さい",
        optionC: "少し",
        optionD: "微小",
        correctOption: "optionA"
    },

    {
        question: "未来形の文はどれですか?",
        optionA: "彼女は歌を歌っています",
        optionB: "彼女は歌を歌いました",
        optionC: "彼女は歌を歌います",
        optionD: "彼女は歌を歌うでしょう",
        correctOption: "optionA"
    },

    {
        question: "「マウス」の複数形は何ですか?",
        optionA: "マウス",
        optionB: "ねずみ",
        optionC: "ヘラジカ",
        optionD: "ミース",
        correctOption: "optionA"
    },

    {
        question: "前置詞は次のうちどれですか?",
        optionA: "走る",
        optionB: "の上",
        optionC: "ジャンプ",
        optionD: "速い",
        correctOption: "optionB"
    },

    {
        question: "これらの数字のうち奇数はどれですか?",
        optionA: "十",
        optionB: "12",
        optionC: "八",
        optionD: "十一",
        correctOption: "optionD"
    },

    {
        question: `"「良い」の比較形は何ですか"? `,
        optionA: "最高",
        optionB: "より良い",
        optionC: "より良いです",
        optionD: "より良い",
        correctOption: "optionD"
    },

    {
        question: " どの単語が代名詞ですか?",
        optionA: "ジャンプ",
        optionB: "彼女",
        optionC: "美味しい",
        optionD: "素早く",
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
  