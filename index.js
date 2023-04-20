let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")
let playerEl = document.getElementById("player-el")
let startGameButton = document.getElementById("start-game")

let newCardButton = document.createElement('button')
newCardButton.innerText='NEW CARD'
newCardButton.id='new-card'

// Specific for ID tags in html using #<id-name>
// .<class-name>
//let sumEl = document.querySelector("#sum-el")
let sum = 0
let message = ""
let hasBlackJack = false
let isAlive = true
let cards = []

// Button disappears off screen after pressing (to start game)
startGameButton.addEventListener('click', () => {
    startGameButton.remove()
    document.body.appendChild(newCardButton)
})

// Button functionality
newCardButton.addEventListener('click', () =>{
    newCard()
})

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
        restart() // Restart button appears
    }
    else{
        isAlive = false
        message = "You're out of the game"
        restart() // Restart button appears
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


function restart(){
    if ((isAlive && hasBlackJack) || (!isAlive && !hasBlackJack)){
        newCardButton.remove() // Remove new card button from screen
        // Creating start button and giving attributes
        let restartButton = document.createElement('button')
        restartButton.innerText='RESTART GAME'
        restartButton.id='restart-el'
        
        // Giving action when pressed - refresh page
        restartButton.addEventListener('click',() =>{
            location.reload()
        })
        
        // Add element to the page
        document.body.appendChild(restartButton)
    }
}
