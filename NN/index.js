const net = new brain.NeuralNetwork()

let deck = []
let rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
let suit = ['C', 'D', 'H', 'S']

function createDeck() {
    for (let i = 0; i < rank.length; i++ ) {
        for (let j = 0; j < suit.length; j++ ) {
            deck.push(suit[j] + '-' + rank[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length -1; i >0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = deck[newIndex]
        deck[newIndex] = deck[i]
        deck[i] = oldValue
    }
}

createDeck()
shuffleDeck()

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

function getColor(card) {
    const temp = card.split('-')
    return temp[0]
}

let valueCoded = []
let colorCoded = []

function CodeCard(card) {
    const value = getValue(card)
    const color = getColor(card)

    colorCoded = []
    valueCoded = []

    suit.forEach(e => {
        if (e != color) {
            colorCoded.push(0)
        }
        else {
            colorCoded.push(1)
        }
    })

    //console.log(colorCoded)

    for (let i = 1; i <= rank.length; i++) {
        if (i != value) {
            valueCoded.push(0)
        }
        else {
            valueCoded.push(1)
        }
    }

    let combined = []
    combined.push(colorCoded)
    combined.push(valueCoded)

    return combined

    //console.log(valueCoded)
}

let tableCards = []
let playerHand = []

function fillHands() {
    for (let i = 0; i < 4; i++) {
        tableCards.push(deck.pop());
    }
    console.log(tableCards)
    
    for (let i = 0; i < 3; i++) {
        playerHand.push(deck.pop());
    }
    console.log(playerHand)
}

fillHands()

let tableCardsCoded = []
let playerHandCoded = []

tableCards.forEach(e => {
    const coded = CodeCard(e)
    tableCardsCoded.push(coded)
});

console.log(JSON.stringify(tableCardsCoded))

playerHand.forEach(e => {
    const coded = CodeCard(e)
    playerHandCoded.push(coded)
});

console.log(JSON.stringify(playerHandCoded))















