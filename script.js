"use strict";

const images = ["bulba.png", "caterpie.png", "charmander.png", "pidgey.png", "pikachu.png", "rattata.png", "squirtle.png", "weedle.png"]
const CARDS_ON_BOARD = 16;
let tries = 0;
let matches = 0;
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
let selectedCard = null;
window.addEventListener("load", start)

function start() {
    console.log("JavaScript er startet");
    initializeCards();
    makeCardsClickable();

}


function initializeCards() {

    const numbers = [];
    for (let i = 0; i < CARDS_ON_BOARD / 2; i++) {
        numbers[i] = i;
        numbers[i + CARDS_ON_BOARD / 2] = i;
    }

    const cards = [];
    while (numbers.length > 0) {
        const random = Math.floor(Math.random() * numbers.length);

        // add random index to cards
        cards.push(numbers[random]);

        // remove random index 
        numbers.splice(random, 1);
    }
    console.log(cards);
    displayCards(cards);
}
function displayCards(cards) {
    const elements = document.querySelectorAll(".card");
    console.log(elements);
    elements.forEach((element, index) => {
        element.dataset.image = cards[index];
        const image = element.querySelector("img");
        image.src = "images/" + images[cards[index]];
    });
}
function makeCardsClickable() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", (event) => clickCard(card));
    });
}
function clickCard(card) {
    if (card == selectedCard) {
        return;
    }
    if (card.dataset.match) {
        return;
    }
    if (selectedCard) {
        tries++;
        card.classList.add("selected");
        const firstCard = selectedCard;
        const secondCard = card;

        console.log(firstCard, secondCard);

        if (firstCard.dataset.image == secondCard.dataset.image) {
            console.log("match");
            firstCard.dataset.match = true;
            secondCard.dataset.match = true;
            matches++;
        } else {
            // remove selected class from both cards if they don't match
            firstCard.classList.remove("selected");
            secondCard.classList.remove("selected");
            console.log("no match");
        }
        selectedCard = null;
        displayTries();
        displayMatches();

        if (matches == CARDS_ON_BOARD / 2) {
            gameOver();
        }
    }
    card.classList.add("selected")
    selectedCard = card;
    
}
function displayTries() {
    document.querySelector("#scores #tries span").textContent = tries;

}
function displayMatches() {
    document.querySelector("#scores #matches span").textContent = matches;
}
function gameOver() {
    console.log("game over");
}