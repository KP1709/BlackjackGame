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

// Counts the number of that value stored in the array
function valueCount(newCard){
    count = cards.filter(value => value  == newCard) // Filter by card selected
    filteredList = count.length + 1 // Add 1 to get correct length
    return filteredList // return value to use in newCard()
}

// Function to recall newCard() to get another value to test 
function getNewCard(){
    newCard()
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){
        let newCard = getRandomCard()
        let numberCount = valueCount(newCard) // Count number of values used in game
        if ((numberCount > 4) && (newCard != 10)){ // In a deck there are 4 of each value
            getNewCard()
        }
        else if ((newCard === 10)&&(numberCount > 13)){ // In a deck there are 12 cards which equal 10
            getNewCard()
        }
        else{
            sum = sum + newCard // Runs this section if value is valid
            cards.push(newCard)
            renderGame()
        }
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
