const quizData = [
    {
        id: 0,
        src: "https://i.postimg.cc/MGqzJGvK/01.jpg",
        correct: 1
    },
    {
        id: 1,
        src: "https://i.postimg.cc/V6N15Hqx/02.jpg",
        correct: 1
    },
    {
        id: 2,
        src: "https://i.postimg.cc/wB2gqdm5/03.jpg",
        correct: 1
    },
    {
        id: 3,
        src: "https://i.postimg.cc/cCgSBg5T/04.jpg",
        correct: 1
    },
    {
        id: 4,
        src: "https://i.postimg.cc/bwQq5nYB/05.jpg",
        correct: 1
    },
    {
        id: 5,
        src: "https://i.postimg.cc/dVMqn6FC/06.jpg",
        correct: 1
    },
    {
        id: 6,
        src: "https://i.postimg.cc/J0fW6rf8/07.jpg",
        correct: 1
    },
    {
        id: 7,
        src: "https://i.postimg.cc/g0zbBBTx/08.jpg",
        correct: 1
    },
    {
        id: 8,
        src: "https://i.postimg.cc/kgdmW5NF/09.jpg",
        correct: 1
    },
    {
        id: 9,
        src: "https://i.postimg.cc/vBDFGxMM/10.jpg",
        correct: 1
    },
    {
        id: 10,
        src: "https://i.postimg.cc/Jngw074X/11.jpg",
        correct: 1
    },
    {
        id: 11,
        src: "https://i.postimg.cc/X75WZ55Y/12.jpg",
        correct: 0
    },
    {
        id: 12,
        src: "https://i.postimg.cc/59T1Ng6r/13.jpg",
        correct: 0
    },
    {
        id: 13,
        src: "https://i.postimg.cc/52qMgMnc/14.jpg",
        correct: 1
    },
    {
        id: 14,
        src: "https://i.postimg.cc/N0dvh73p/15.jpg",
        correct: 0
    },
    {
        id: 15,
        src: "https://i.postimg.cc/wMsCmK7G/16.jpg",
        correct: 0
    },
    {
        id: 16,
        src: "https://i.postimg.cc/BZLbgXFd/17.jpg",
        correct: 0
    },
    {
        id: 17,
        src: "https://i.postimg.cc/Df9ZYndm/18.jpg",
        correct: 0
    },
    {
        id: 18,
        src: "https://i.postimg.cc/qgV9cmKM/19.jpg",
        correct: 0
    },
    {
        id: 19,
        src: "https://i.postimg.cc/MK1GCNd5/20.jpg",
        correct: 0
    }
];

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
};

shuffleArray(quizData);

const nextQbtn = document.getElementById("btn");
const imgElem = document.getElementById("img");
const quizForm = document.getElementById("quiz-form");
const result = document.getElementById("result");
const qCounter = document.getElementById("question-counter");

let currentImage = 0;
let img = new Image();
img.src = quizData[currentImage].src;
img.classList.add("d-block", "img-fluid");
img.style.maxHeight = "500px";
imgElem.appendChild(img);
let score = 0;
const wrongAnswers = [];



function showResults() {
    quizForm.classList.add("d-none", "invisible");
    result.innerHTML += `<p>You gave the correct answer to <strong>${Math.round(100*score/quizData.length)}%</strong> of the questions (${score}/${quizData.length}).</p>`;
    if (wrongAnswers.length) {
        result.innerHTML += "<p>Check these pictures again (<span class=\"text-success fw-bold\">green</span> = libs, <span class=\"text-danger fw-bold\">red</span> = not libs):</p>";
        const filtrQuizData = quizData.filter((obj) => wrongAnswers.includes(obj.id));
        filtrQuizData.forEach((question) => {
            let i = img.cloneNode();
            i.src = question.src;
            question.correct ? i.classList.add("border-green") : i.classList.add("border-red");
            result.appendChild(i);
        });
    }
    result.classList.remove("invisible");
}



function nextImage() {
    let answer = document.querySelector('input[name="answer"]:checked')?.value;
    if (answer) {
        quizData[currentImage].correct === ~~answer ? score++ : wrongAnswers.push(quizData[currentImage].id);
        if (currentImage < quizData.length-1) {
            currentImage++;
            img.src = quizData[currentImage].src;
            imgElem.replaceChildren(img);
        } else {
            showResults();
        }
        document.querySelector('input[name="answer"]:checked').checked = false;
        qCounter.innerText = currentImage+1;
    }
}


nextQbtn.addEventListener("click", nextImage);