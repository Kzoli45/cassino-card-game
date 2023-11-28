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

/*
    <div class="card">
        <div class="card-inner">
            <div class="card-front">
                <span>J</span>
                <span id="suit">♣</span>
                <span>J</span>
            </div>
            <div class="card-back"></div>
        </div>
    </div>
*/

/*
    <div class="card">
        <div class="card-inner">
            <div class="cpu-card-front"></div>
            <div class="cpu-card-back">
                <span>J</span>
                <span id="suit">♣</span>
                <span>J</span>
            </div>
        </div>
    </div>
*/

function createCard(parent, toHand, faceCard) {
    let card = deck.pop(deck.length - 1)
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

function firstDeal() {
    dealCards()
    dealToTable()
    removeTemps()
    console.log(deck.length)
}

function removeTemps() {
    document.querySelector('.table').removeChild(document.getElementById('temp1'))
    document.querySelector('.player-hand').removeChild(document.getElementById('temp2'))
    document.querySelector('.computer-hand').removeChild(document.getElementById('temp'))
}

const deckPosition = document.querySelector('.deck');

/*deckPosition.addEventListener(('click'), () => {
    dealCards();
    dealToTable();
    removeTemps();
    console.log(deck.length)
})
*/

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

let selectedFromPlayer = []
let selectedFromTable = []
let selectedFromComputer = []

let cardsWonByPlayer = []
let playerFinalCards = []

let cardsWonByComputer = []
let computerFinalCards = []

playCardsButton.addEventListener('click', () => {
    selectedFromPlayer = [];
    selectedFromTable = [];
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

    setTimeout(() => {
        computerMove();
    }, 2000);
})

function placeCardOnTable(newParent) {
    const movedCard = document.getElementById(selectedFromPlayer[0]);
    const parent = movedCard.parentNode;

    parent.removeChild(movedCard);
    newParent.appendChild(movedCard);
    
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
        console.log(cardsWonByPlayer)
        console.log(playerFinalCards)
        cardsWonByPlayer.forEach((element) => {
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

class Computer {
    constructor() {
        this.hand = computerHand;
        this.tableSelected = [];
        this.computerSelected = [];
        this.wonCards = cardsWonByComputer;
        this.finalCards = computerFinalCards;
        this.placedCard = ''
    }

    isLegalMove() {
        let computerSum = 0;
        let tableSum = 0;

        for (let i = 0; i < this.computerSelected.length; i++) {
            computerSum += parseInt(getValue(this.computerSelected[i]))
        }

        for (let i = 0; i < this.tableSelected.length; i++) {
            tableSum += parseInt(getValue(this.tableSelected[i]))
        }

        if (computerSum <= 13 && tableSum <= 13 && tableSum === computerSum) {
            return true
        }
        else {
            return false
        }
    }

    captureCards() {
        for (let i = 0; i < this.hand.length; i++) {
            const card = this.hand[i];
    
            for (let j = 0; j < tableCards.length; j++) {
                const tableCard = tableCards[j];
    
                if (parseInt(getValue(card)) === parseInt(getValue(tableCard))) {
                    this.tableSelected.push(tableCard);
                    this.computerSelected.push(card);
                    break;
                }
            }
        }
        if (this.tableSelected.length > 0 && this.computerSelected.length > 0) {
            if (this.isLegalMove) {
                this.wonCards = []
                this.tableSelected.forEach(card => {
                    this.wonCards.push(card)
                    this.finalCards.push(card)
                })
                this.computerSelected.forEach(card => {
                    this.wonCards.push(card)
                    this.finalCards.push(card)
                })
            }
        }
        else {
            this.placeCard()
        }
    }

    placeCard() {
        const randomIndex = Math.floor(Math.random() * this.hand.length);
        this.placedCard = this.hand[randomIndex]
    }

}

const opponent = new Computer();
const computerWonDeck = document.getElementById('computer-wonDeck')

function computerMove() {

    opponent.captureCards()
    if (opponent.wonCards.length > 0) {
        console.log(opponent.wonCards)
        opponent.wonCards.forEach(element => {
            const card = document.getElementById(element)
            const parent = card.parentNode
            const grandParent = parent.parentNode

            const originalPos = parent.getBoundingClientRect();
            const newPosition = computerWonDeck.getBoundingClientRect();
            
            moveCard(card, parent, computerWonDeck)
            card.style.position = 'absolute'

            anime({
                begin: () => {
                    computerWonDeck.style.opacity = 1
                },
                targets: card,
                translateX: [originalPos.left - newPosition.left, 0],
                translateY: [(originalPos.top - newPosition.top), 0],
                easing: 'easeOutCubic',
                duration: 1500,
                update: function (anim) {
                    if (anim.progress > 20) {
                        card.classList.add('flip')
                    }
                },
                complete: () => {
                    computerWonDeck.style.opacity = 0
                    computerWonDeck.removeChild(card)
                }
            })
            if (parent.classList.contains('table-pos')) {
                grandParent.removeChild(parent)
            }
        })
    }
    else {
        opponent.placeCard()

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

        placeComputerCard(newTablePosition)
    }
}

function placeComputerCard(newParent) {
    const movedCard = document.getElementById(opponent.placedCard);
    const parent = movedCard.parentNode;

    parent.removeChild(movedCard);
    newParent.appendChild(movedCard);
    
    const originalPos = parent.getBoundingClientRect()
    const newPosition = newParent.getBoundingClientRect()

    anime({
        targets: movedCard,
        translateX: [originalPos.left - newPosition.left, 0],
        translateY: [(originalPos.top - newPosition.top), 0],
        easing: 'easeOutQuad',
        duration: 600,
        complete: () => {
            movedCard.classList.add('flip')
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

