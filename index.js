let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")
let playerEl = document.getElementById("player-el")

// Specific for ID tags in html using #<id-name>
// .<class-name>
//let sumEl = document.querySelector("#sum-el")
let sum = 0
let message = ""
let hasBlackJack = false
let isAlive = true
let cards = []

function getRandomCard(){
    value = Math.floor(Math.random() * (11 - 1) + 1)
    if(value > 10){
        value = 10
    }
    else if(value === 1){
        value = 11
    }
    return value
}

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard,secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame(){
    cardEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardEl.textContent = cardEl.textContent + cards[i] + " "
    }
    if (sum <= 20){
        message = "Do you want to draw a new card?"
    } 
    else if(sum === 21){
        hasBlackJack = true
        message = "You won - you've got Blackjack!"
    }
    else{
        isAlive = false
        message = "You're out of the game"
    }

    messageEl.textContent = message  
    sumEl.textContent = "Sum: " + sum
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){
        console.log("Drawing out a new card")
        let newCard = getRandomCard()
        sum = sum + newCard
        cards.push(newCard)
        renderGame()
    }

}







