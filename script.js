'use strict';
const user1Score = document.querySelector('#score--0');
const user2Score = document.querySelector('#score--1');
const user1cScore = document.querySelector('#current--0');
const user2cScore = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const rollDiceButton = document.querySelector('.btn--roll');
const newGameButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let active = 0;

const getRandom = () => {
    return Math.trunc(Math.random() * (6 - 0) + 1);
};

const newGame = () => {
    user1Score.textContent = '0';
    user2Score.textContent = '0';
    user1cScore.textContent = '0';
    user2cScore.textContent = '0';
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    dice.classList.add('hidden');
    holdButton.removeAttribute('disabled');
    rollDiceButton.removeAttribute('disabled');
    active = 0;
};

const diceRolled = () => {
    let number = getRandom();
    console.log(number);
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');
    dice.src = `dice-${number}.png`;
    userCalculate(number);
};

const userCalculate = (number) => {
    if (number == 1) {
        changeUser();
    } else {
        if (active == 0) {
            user1cScore.textContent = Number(user1cScore.textContent) + number;
        } else {
            user2cScore.textContent = Number(user2cScore.textContent) + number;
        }
    }
};

const changeUser = () => {
    if (active == 0) {
        user1cScore.textContent = '0';
        player1.classList.remove('player--active');
        player2.classList.add('player--active');
    } else {
        user2cScore.textContent = '0';
        player2.classList.remove('player--active');
        player1.classList.add('player--active');
    }
    active = 1 - active;
};
const holdButtonHandler = () => {
    if (active == 0) {
        user1Score.textContent =
            Number(user1Score.textContent) + Number(user1cScore.textContent);
    } else {
        user2Score.textContent =
            Number(user2Score.textContent) + Number(user2cScore.textContent);
    }
    if (Number(user1Score.textContent) > 100) {
        player1.classList.add('player--winner');
        holdButton.disabled = true;
        rollDiceButton.disabled = true;
    } else if (Number(user2Score.textContent) > 100) {
        player2.classList.add('player--winner');
        holdButton.disabled = true;
        rollDiceButton.disabled = true;
    }
    changeUser();
};

rollDiceButton.addEventListener('click', () => {
    diceRolled();
});
newGameButton.addEventListener('click', () => {
    newGame();
});
holdButton.addEventListener('click', () => {
    holdButtonHandler();
});
newGame();
