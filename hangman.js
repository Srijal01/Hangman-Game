const wordList = ['python', 'dashain', 'radheradhe', 'hangman', 'developer', 'papaya', 'javascript','calender', 'lalitpur', 'html', 'break', 'college', 'school', 'multimedia', 'simulation', 'css', 'nepal', 'kathmandu', 'algorithm', 'system', 'srijal', 'festival', 'tihar', 'computation', 'department', 'meeting', 'organization', 'saturday', 'holiday', 'plug', 'king'];
const word = wordList[Math.floor(Math.random() * wordList.length)];
const guessedLetters = [];
let attemptsLeft = 6;

const hangmanStages = [
    `
     -----
     |   |
         |
         |
         |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
         |
         |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
     |   |
         |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
    /|   |
         |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
         |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
    /    |
         |
    =========
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    =========
    `
];

function updateDisplay() {
    const displayWord = word
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    document.getElementById('wordDisplay').textContent = displayWord;
    document.getElementById('guessedLetters').textContent = guessedLetters.join(', ');
    document.getElementById('remainingAttempts').textContent = attemptsLeft;
    document.getElementById('hangmanDiagram').textContent = hangmanStages[6 - attemptsLeft];

    if (!displayWord.includes('_')) {
        document.getElementById('message').textContent = '🎉 Congratulations! You guessed the word!';
        document.getElementById('guessButton').disabled = true;
        document.getElementById('guessInput').disabled = true;
    }
}

document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput');
    const guessedLetter = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (!guessedLetter || guessedLetter.length !== 1 || guessedLetters.includes(guessedLetter)) {
        document.getElementById('message').textContent = '⚠️ Invalid or duplicate guess. Try again!';
        return;
    }

    if (word.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        document.getElementById('message').textContent = '✅ Correct guess!';
    } else {
        attemptsLeft--;
        guessedLetters.push(guessedLetter);
        document.getElementById('message').textContent = '❌ Wrong guess!';
    }

    if (attemptsLeft <= 0) {
        document.getElementById('message').textContent = `💀 Game over! The word was "${word}".`;
        document.getElementById('guessButton').disabled = true;
        document.getElementById('guessInput').disabled = true;
    }

    updateDisplay();
});

updateDisplay();
