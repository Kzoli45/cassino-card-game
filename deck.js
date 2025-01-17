let deck = []
let rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
let suit = ['C', 'S', 'H', 'D']

let playerHand = []
let computerHand = []
let tableCards = []

function createDeck() {
    for (let i = 0; i < rank.length; i++ ) {
        for (let j = 0; j < suit.length; j++ ) {
            deck.push(suit[j] + '-' + rank[i]);
        }
    }
    //console.log(deck)
}

function shuffleDeck() {
    for (let i = deck.length -1; i >0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = deck[newIndex]
        deck[newIndex] = deck[i]
        deck[i] = oldValue
    }
    //console.log(deck)
}

function createCard(parent, toHand, faceCard) {
    let card = deck.pop()
    let temp = card.split('-')
    let rank = temp[1]
    let color = temp[0]

    const cardElement = createElement('div')
    addClass(cardElement, 'card')

    const cardInner = createElement('div')
    addClass(cardInner, 'card-inner')

    appendChild(cardElement, cardInner)

    const CardFront = createElement('div')
    const cardBack = createElement('div')

    appendChild(cardInner, CardFront)
    appendChild(cardInner, cardBack)

    const rankText = createElement('span')
    const colorText = createElement('span')
    const rankText2 = createElement('span')

    addID(cardElement, card)
    addID(rankText, card + '1')
    addID(colorText, card + '2')
    addID(rankText2, card + '3')

    if (faceCard) {
        addClass(cardBack, 'card-back')
        addClass(CardFront, 'card-front')

        appendChild(CardFront, rankText)
        appendChild(CardFront, colorText)
        appendChild(CardFront, rankText2)
    }
    else {
        addClass(cardBack, 'cpu-card-back')
        addClass(CardFront, 'cpu-card-front')

        appendChild(cardBack, rankText)
        appendChild(cardBack, colorText)
        appendChild(cardBack, rankText2)
    }

    parent.appendChild(cardElement)
    toHand.push(card);

    addText(card + '1', rank)
    addText(card + '3', rank)

    if (color === 'C') {
        addText(card + '2', '♣')
        addClass(cardInner, 'black')
    }
    else if (color === 'S') {
        addText(card + '2', '♠')
        addClass(cardInner, 'black')
    }
    else if (color === 'H') {
        addText(card + '2', '♥')
        addClass(cardInner, 'red')
    }
    else if (color === 'D') {
        addText(card + '2', '♦')
        addClass(cardInner, 'red')
    }

    return cardElement;

}

function createElement(elementType) {
    return document.createElement(elementType)
}

function appendChild(parent, child) {
    parent.appendChild(child)
}

function addClass(element, className) {
    element.classList.add(className)
}

function addID(element, idName) {
    element.setAttribute('id', idName)
}

function addText(idName, text) {
    document.getElementById(idName).innerHTML = text;
}

function dealCards() {
    dealToPlayer()
    dealToComputer()
}

function checkHandsEmpty() {
    return playerHand.length === 0 && computerHand.length === 0;
}

function firstDeal() {
    dealCards()
    dealToTable()
    removeTemps()
    //console.log(deck.length)
    currentPlayer = Math.random() < 0.5 ? 'player' : 'computer';
    console.log(`Starting turn: ${currentPlayer}`);
    if (currentPlayer === 'computer') {
        setTimeout(computerMove, 4000);
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'player' ? 'computer' : 'player';
    console.log(`Current turn: ${currentPlayer}`);
    if (currentPlayer === 'computer') {
        if (checkHandsEmpty()) {
            setTimeout(computerMove, 7000);
        }
        else {
            setTimeout(computerMove, 3000)
        }
    }
}

let currentRound = 1

function dealNewCards() {
    if (deck.length > 0) {
        const positions = document.querySelectorAll('.player-pos')
        positions.forEach(element => {
        element.style.display = '' })

        setTimeout(() => {
            dealToPlayer();
            dealToComputer();
        }, 1500)
    } else {
        console.log('Deck is empty!');
    }
    currentRound += 1
    console.log(currentRound)
}

function removeTemps() {
    document.querySelector('.table').removeChild(document.getElementById('temp1'))
    document.querySelector('.player-hand').removeChild(document.getElementById('temp2'))
    document.querySelector('.computer-hand').removeChild(document.getElementById('temp'))
}

const deckPosition = document.querySelector('.deck');

function dealToTable() {
    const table = document.querySelectorAll('.table-pos');
    table.forEach((position, index) => {
        const cardElement = createCard(deckPosition, tableCards, false);
        animateCard(cardElement, position, index, true);
        moveCard(cardElement, deckPosition, position);
        addCardClick(cardElement)
    });
}

function dealToComputer() {
    const computer = document.querySelectorAll('.computer-pos');
    computer.forEach((position, index) => {
        const cardElement = createCard(deckPosition, computerHand, false);
        animateCard(cardElement, position, index);
        moveCard(cardElement, deckPosition, position);
    });
}

function dealToPlayer() {
    const player = document.querySelectorAll('.player-pos');
    player.forEach((position, index) => {
        const cardElement = createCard(deckPosition, playerHand, false);
        animateCard(cardElement, position, index, true);
        moveCard(cardElement, deckPosition, position);
        addCardClick(cardElement)
    });
}


function animateCard(cardElement, targetPosition, index, shouldFlip) {

    const rectCard = deckPosition.getBoundingClientRect();
    const rectTarget = targetPosition.getBoundingClientRect();

    cardElement.style.opacity = '0';

    anime({
        targets: cardElement,
        translateX:  [rectCard.left - rectTarget.left, 0],
        translateY:  [rectCard.top - rectTarget.top, 0],
        easing: 'easeOutQuad',
        duration: 500,
        opacity: 1,
        delay: index * 500,
        complete: () => {
            if (shouldFlip) {
                cardElement.classList.add('flip')
            }
            if (cardElement.parentNode.classList.contains('player-pos')) {
                cardElement.style.boxShadow = '0 0 0 .05em rgb(0 0 0)';
            }
        }
    });
}

function moveCard(element, from, to) {
    from.removeChild(element);
    to.appendChild(element);
}


function addCardClick(cardElement) {
    cardElement.addEventListener('click', () => {
        selectAnimation(cardElement);
    });
}

playCardsButton = document.querySelector('.btn')

function selectAnimation(card) {
    if (currentPlayer === 'player') {
        if(card.classList.contains('selected')) {
            anime ({
                targets: card,
                translateY: 0,
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    card.classList.remove('selected')
                    const cards = document.querySelectorAll('.card')
                    let isSelecetd = Array.from(cards).some(e => e.classList.contains('selected') && e.closest('.player-pos'))

                    if(!isSelecetd) {
                        playCardsButton.style.opacity = 0;
                        playCardsButton.style.cursor = '';
                        playCardsButton.style.pointerEvents = 'none'
                    }

                }
            })
        }
        else {
            anime ({
                targets: card,
                translateY: -20,
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    card.classList.add('selected')
                    
                    if (card.closest('.player-pos')) {
                        playCardsButton.style.opacity = 1;
                        playCardsButton.style.cursor = 'pointer';
                        playCardsButton.style.pointerEvents = ''
                    }
                }
            })
        }
    }
}

let selectedFromPlayer = []
let selectedFromTable = []
let selectedFromComputer = []

let cardsWonByPlayer = []
let playerFinalCards = []

let cardsWonByComputer = []
let computerFinalCards = []

playCardsButton.addEventListener('click', () => {
    if (currentPlayer === 'player') {
        selectedFromPlayer = [];
        selectedFromTable = [];
        let originalArray = [...tableCards]
        console.log(originalArray)
        const selectedCards = document.querySelectorAll('.selected')
        selectedCards.forEach((card)  => {
            if (card.closest('.player-pos')) {
                selectedFromPlayer.push(card.id)
            }
            else if (card.closest('.table-pos')) {
                selectedFromTable.push(card.id)
            }
            selectAnimation(card)
            })
    
            //console.log(selectedFromPlayer)
            //console.log(selectedFromTable)
    
            if (selectedFromPlayer.length === 1 && selectedFromTable.length === 0) {
                let highestNumber = 0;
                document.querySelectorAll('[id^="tab-pos-"]').forEach(element => {
                const number = parseInt(element.id.replace('tab-pos-', ''), 10)
                highestNumber = Math.max(highestNumber, number)
                })
                const newId = 'tab-pos-' + (highestNumber + 1)
            
                const newTablePosition = createElement('div')
                addClass(newTablePosition, 'table-pos')
                    
                const table = document.querySelector('.table')
                appendChild(table, newTablePosition)
            
                addID(newTablePosition, newId)
            
                placeCardOnTable(newTablePosition)
                }
                else {
                    moveCardsToWonDeck()
                }

                let newArray = [...tableCards]
                
                if (originalArray.length !== newArray.length) {
                    if (computerHand.length > 0) {
                        switchPlayer()
                    }
                    else {
                        if (checkHandsEmpty()) {
                            dealNewCards();
                        }
                        currentPlayer = 'player'
                    }
                }

                console.log(playerFinalCards)
    }
})

function placeCardOnTable(newParent) {
    const movedCard = document.getElementById(selectedFromPlayer[0]);
    const parent = movedCard.parentNode;

    parent.removeChild(movedCard);
    newParent.appendChild(movedCard);

    const indexToRemove = playerHand.indexOf(selectedFromPlayer[0]);

    if (indexToRemove !== -1) {
        playerHand.splice(indexToRemove, 1);
    }

    tableCards.push(selectedFromPlayer[0])

    //console.log(`new player hand: ${playerHand}`)
    //console.log(`new table: ${tableCards}`)
    
    const originalPos = parent.getBoundingClientRect()
    const newPosition = newParent.getBoundingClientRect()

    anime({
        targets: movedCard,
        translateX: [originalPos.left - newPosition.left, 0],
        translateY: [(originalPos.top - newPosition.top) - 20, 0],
        easing: 'easeOutQuad',
        duration: 600,
    });
    if (parent.classList.contains('player-pos')) {
        if (parent.children.length === 0) {
            //console.log('haha')
            parent.style.display = 'none'
            }
        }
}

const wonDeck = document.getElementById('player-wonDeck')

function moveCardsToWonDeck() {
    let playerSum = 0
    let tableSum = 0

    for (let i = 0; i < selectedFromPlayer.length; i++) {
        playerSum += parseInt(getValue(selectedFromPlayer[i]))
    }
    //console.log(playerSum)

    for (let i = 0; i < selectedFromTable.length; i++) {
        tableSum += parseInt(getValue(selectedFromTable[i]))
    }
    //console.log(tableSum)

    if (playerSum <= 13 && tableSum <= 13 && playerSum === tableSum) {
        cardsWonByPlayer = []
        selectedFromPlayer.forEach(card => {
            cardsWonByPlayer.push(card)
            playerFinalCards.push(card)
        })
        selectedFromTable.forEach(card => {
            cardsWonByPlayer.push(card)
            playerFinalCards.push(card)
        })
        //console.log(cardsWonByPlayer)
        //console.log(playerFinalCards)
        cardsWonByPlayer.forEach((element) => {

        const tableIndexToRemove = tableCards.indexOf(element);
        if (tableIndexToRemove !== -1) {
            tableCards.splice(tableIndexToRemove, 1);
            //console.log(`new table after capture: ${tableCards}`)
        }

        const playerIndexToRemove = playerHand.indexOf(element);
        if (playerIndexToRemove !== -1) {
            playerHand.splice(playerIndexToRemove, 1);
            //console.log(`new player hand after capture: ${playerHand}`)
        }

            const card = document.getElementById(element)
            const parent = card.parentNode
            const grandParent = parent.parentNode

            const originalPos = parent.getBoundingClientRect();
            const newPosition = wonDeck.getBoundingClientRect();
            
            moveCard(card, parent, wonDeck)
            card.style.position = 'absolute'

            anime({
                begin: () => {
                    wonDeck.style.opacity = 1
                },
                targets: card,
                translateX: [originalPos.left - newPosition.left, 0],
                translateY: [(originalPos.top - newPosition.top)-20, 0],
                easing: 'easeOutCubic',
                duration: 1500,
                update: function (anim) {
                    if (anim.progress > 20) {
                        card.classList.remove('flip')
                    }
                },
                complete: () => {
                    wonDeck.style.opacity = 0
                    wonDeck.removeChild(card)
                }
            })
            if (parent.classList.contains('table-pos')) {
                grandParent.removeChild(parent)
            }
            if (parent.classList.contains('player-pos')) {
                if (parent.children.length === 0) {
                    parent.style.display = 'none'
                }
            }
        })
    }
}

function getValue(card) {
    const temp = card.split('-')
    let value = temp[1]

    if (value === 'A') {
        return 1
    }
    else if (value === 'K') {
        return 13
    }
    else if (value === 'Q') {
        return 12
    }
    else if (value === 'J') {
        return 11
    }
    else {
        return value
    }
}

function computerMove() {
    ComputerSelectCardToPlay()

    let highestNumber = 0

    document.querySelectorAll('[id^="tab-pos-"]').forEach(element => {
        const number = parseInt(element.id.replace('tab-pos-', ''), 10)
        highestNumber = Math.max(highestNumber, number)
    })

    const newId = 'tab-pos-' + (highestNumber + 1)
    
    const newTablePosition = createElement('div')
    addClass(newTablePosition, 'table-pos')
        
    const table = document.querySelector('.table')
    appendChild(table, newTablePosition)

    addID(newTablePosition, newId)

    placeComputerCard(newTablePosition)

    if (playerHand.length > 0) {
        switchPlayer()
    }
    else {
        if (checkHandsEmpty()) {
            dealNewCards()
        }
        currentPlayer = 'computer'
        setTimeout(computerMove, 2000)
    }
}

let placedCPUCard = ''

function ComputerSelectCardToPlay() {
    if (computerHand.length > 0) {
        if (computerHand.length === 1) {
            placedCPUCard = computerHand[0]
        }
        else {
            const randomIndex = Math.floor(Math.random() * computerHand.length)
            placedCPUCard = computerHand[randomIndex]
        }

        //console.log(`Card placed by computer: ${placedCPUCard}`)
    }
}

function placeComputerCard(newParent) {
    const cardToMove = document.getElementById(placedCPUCard)
    const cardParent = cardToMove.parentNode
    const indexToRemove = computerHand.indexOf(placedCPUCard)

    if (indexToRemove !== -1) {
        computerHand.splice(indexToRemove, 1)
    }

    moveCard(cardToMove, cardParent, newParent)
    addCardClick(cardToMove)

    tableCards.push(placedCPUCard)

    //console.log(`New computer hand: ${computerHand}`)
    //console.log(`New table: ${tableCards}`)

    const originalPos = cardParent.getBoundingClientRect()
    const newPosition = newParent.getBoundingClientRect()

    anime({
        targets: cardToMove,
        translateX: [originalPos.left - newPosition.left, 0],
        translateY: [(originalPos.top - newPosition.top), 0],
        easing: 'easeOutQuad',
        duration: 600,
        complete: () => {
        cardToMove.classList.add('flip')
        }
    });
}

function startGame() {
    createDeck()
    shuffleDeck()
    firstDeal()
    //console.log(computerHand)
    //console.log(tableCards)
    //console.log(playerHand)
}

startGame()
