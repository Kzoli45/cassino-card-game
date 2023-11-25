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
        easing: 'easeInOutQuad',
        duration: 500,
        opacity: 1,
        delay: index * 500,
        complete: () => {
            if (shouldFlip) {
                cardElement.classList.add('flip')
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

function startGame() {
    createDeck()
    shuffleDeck()
    firstDeal()
    console.log(computerHand)
    console.log(tableCards)
    console.log(playerHand)
}

startGame()

