// Generate Letters
const lettersContainer = document.querySelector('.letters');
const letters = 'abcdefghijklmnopqrstuvwxyz';
const lettersArr = Array.from(letters);
let wrongTries = 0;
const hiddenHangmanParts = Array.from(
    document.querySelectorAll('.hangman-draw .hidden')
);
const gameEndPopup = document.querySelectorAll('.popup');
const successAudio = document.getElementById('audio-success');
const failAudio = document.getElementById('audio-fail');
successAudio.pause();
failAudio.pause();

lettersArr.forEach((letter) => {
    const letterDiv = document.createElement('div');
    const letterText = document.createTextNode(letter);
    letterDiv.classList.add('letter-box');
    letterDiv.appendChild(letterText);
    lettersContainer.appendChild(letterDiv);
});

// Generate Random Value from Object

const words = {
    programming: [
        'php',
        'javascript',
        'go',
        'scale',
        'fortran',
        'r',
        'mysql',
        'python',
    ],
    movies: [
        'Prestige',
        'Inception',
        'parasite',
        'Interstellar',
        'Whiplash',
        'Memento',
        'Coco',
        'Up',
    ],
    people: [
        'Albert Einstein',
        'Hitchcock',
        'Alexander',
        'Cleopatra',
        'Mahatma Gandhi',
    ],
    countries: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar'],
};

// Generate Random Object Key
const wordsKeys = Object.keys(words);
const wordKeyNumber = Math.floor(Math.random() * wordsKeys.length);
const wordKeyValue = wordsKeys[wordKeyNumber];
// Generate Random Value from Object Key Array
const randomCategoryArr = words[wordKeyValue];
const randomCategoryNumber = Math.floor(
    Math.random() * randomCategoryArr.length
);
const randomCategoryValue = randomCategoryArr[randomCategoryNumber]
    .toUpperCase()
    .replace(' ', '');

document.querySelector('.game-word-category span').innerText = wordKeyValue;

// Generate Guess Boxes Based on Word Length
const guessGameInput = document.querySelector('.game-guess');
for (let i = 0; i < randomCategoryValue.length; i++) {
    const guessBoxDiv = document.createElement('div');

    guessBoxDiv.classList.add('guess-box');
    guessBoxDiv.setAttribute('data-letter', `${randomCategoryValue[i]}`);

    guessGameInput.appendChild(guessBoxDiv);
}

// Clicking Letters Logic Start
const guessBoxes = Array.from(document.querySelectorAll('.guess-box'));
console.log(randomCategoryValue);
document.querySelectorAll('.letter-box').forEach((letter) => {
    letter.addEventListener('click', (event) =>
        checkClickedLetter(event.target)
    );
});

const isGameCompleted = () => {
    isCompleted = true;
    guessBoxes.forEach((gamebox) => {
        if (gamebox.innerHTML === '') {
            isCompleted = false;
            return false;
        }
    });
    return isCompleted;
};

// Clicking Letters Logic End
function checkClickedLetter(letter) {
    const letterVal = letter.innerText.toUpperCase();

    if (randomCategoryValue.indexOf(letterVal) !== -1) {
        if (!successAudio.paused || !failAudio.paused) {
            failAudio.pause();
            successAudio.currentTime = 0;
            failAudio.currentTime = 0;
            successAudio.play();
        } else {
            successAudio.currentTime = 0;
            failAudio.currentTime = 0;
            successAudio.play();
        }
        guessBoxes.forEach((box) => {
            if (box.dataset.letter === letterVal) {
                box.innerText = letterVal;
                letter.classList.add('clicked');
            }
        });
        if (isGameCompleted()) {
            lettersContainer.classList.add('finished');
            gameEndPopup[1].classList.add('finished');
            return false;
        }
    } else {
        letter.classList.add('clicked');
        hiddenHangmanParts[wrongTries].classList.remove('hidden');
        wrongTries++;
        console.log(wrongTries);
        if (!successAudio.paused || !failAudio.paused) {
            successAudio.pause();
            successAudio.currentTime = 0;
            failAudio.currentTime = 0;
            failAudio.play();
        } else {
            successAudio.currentTime = 0;
            failAudio.currentTime = 0;
            failAudio.play();
        }
        if (hiddenHangmanParts[wrongTries] === undefined) {
            lettersContainer.classList.add('finished');
            gameEndPopup[0].classList.add('finished');
            return false;
        }
    }
}
