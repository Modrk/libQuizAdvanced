const quizData = [
    {
        id: 0,
        src: "https://i.postimg.cc/dtzy9ynf/01.jpg",
        correct: 1
    },
    {
        id: 1,
        src: "https://i.postimg.cc/hPJmxr8x/02.jpg",
        correct: 1
    },
    {
        id: 2,
        src: "https://i.postimg.cc/mkKtVv39/03.jpg",
        correct: 1
    },
    {
        id: 3,
        src: "https://i.postimg.cc/qvyCDv5v/04.jpg",
        correct: 1
    }
    /*
    ,
    {
        id: 4,
        src: "https://i.postimg.cc/qRMh7XMN/05.jpg",
        correct: 1
    },
    {
        id: 5,
        src: "https://i.postimg.cc/KzJT7ps7/06.jpg",
        correct: 1
    },
    {
        id: 6,
        src: "https://i.postimg.cc/cH9KtgrX/07.jpg",
        correct: 1
    },
    {
        id: 7,
        src: "https://i.postimg.cc/9XkRW93f/08.jpg",
        correct: 1
    },
    {
        id: 8,
        src: "https://i.postimg.cc/J0ssNrXm/09.jpg",
        correct: 1
    },
    {
        id: 9,
        src: "https://i.postimg.cc/Z58CFDW9/10.jpg",
        correct: 1
    },
    {
        id: 10,
        src: "https://i.postimg.cc/PqKJ0pzT/11.jpg",
        correct: 1
    },
    {
        id: 11,
        src: "https://i.postimg.cc/Cxgjg8Dq/12.jpg",
        correct: 0
    },
    {
        id: 12,
        src: "https://i.postimg.cc/Vv0NS7yk/13.jpg",
        correct: 0
    },
    {
        id: 13,
        src: "https://i.postimg.cc/v8Cr0kZX/14.jpg",
        correct: 1
    },
    {
        id: 14,
        src: "https://i.postimg.cc/V6V6LxVh/15.jpg",
        correct: 0
    },
    {
        id: 15,
        src: "https://i.postimg.cc/Kc17rxxR/16.jpg",
        correct: 0
    },
    {
        id: 16,
        src: "https://i.postimg.cc/Yqg1ZR47/17.jpg",
        correct: 0
    },
    {
        id: 17,
        src: "https://i.postimg.cc/RCJfJdLt/18.jpg",
        correct: 0
    },
    {
        id: 18,
        src: "https://i.postimg.cc/G90mvkrJ/19.jpg",
        correct: 0
    },
    {
        id: 19,
        src: "https://i.postimg.cc/jS4ydjQk/20.jpg",
        correct: 0
    }
    */
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

document.getElementById("question-amount").innerText = quizData.length;

let currentImage = 0;
let img = new Image();
img.src = quizData[currentImage].src;
img.classList.add("d-block", "img-fluid");
img.style.maxHeight = "500px";
imgElem.appendChild(img);
let score = 0;
const wrongAnswers = [];
const cache = document.createElement("div");
cache.classList.add("invisible");

function preloadImage(url) {
    let nimg = new Image();
    nimg.src = url;
    nimg.classList.add("invisible");
    cache.appendChild(nimg);
}


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
            img.src = quizData[currentImage+1].src;

            if (currentImage < quizData.length - 2) {
                preloadImage(quizData[currentImage+2].src);
            }
            currentImage++;
        } else {
            showResults();
        }
        document.querySelector('input[name="answer"]:checked').checked = false;
        qCounter.innerText = currentImage+1;
    }
}


nextQbtn.addEventListener("click", nextImage);