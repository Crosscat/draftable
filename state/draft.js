var Draft = function(draftId, draftType, cardsPerPlayer, cube) {
    this.draftId = draftId;
    this.draftType = draftType;
    this.cardsPerPlayer = cardsPerPlayer;
    this.cube = cube;
    this.drafters = 0;
    this.currentTurn = 0;
    this.drafterOrder = [];
    this.started = false;
    this.piles = [[]];
}

Draft.prototype.start = function() {
    this.started = true;
    randomizeDrafterOrder();
    this.cube = initializeCube(this.cardsPerPlayer, this.drafters, this.cube);
    initializePiles(this.cube);
}

Draft.prototype.pickPile = function(pileIndex) {
    if (pileIndex > this.piles.length - 1) {
        return [ this.cube.pop() ];
    }
    var pile = this.piles[pileIndex].slice();
    this.piles[pileIndex] = [];
    return pile;
}

Draft.prototype.skipPile = function(pileIndex) {
    addToPile(pileIndex);
}

function randomizeDrafterOrder() {
    for (var i = 0; i < drafters; i++) {
        this.drafterOrder.push(i);
    }
    this.drafterOrder = shuffle(this.drafterOrder);
}

function initializeCube(cardsPerPlayer, drafters, cube) {
    var totalCards = cardsPerPlayer * drafters;
    var shuffledCube = shuffle(cube);
    var cubeSubset = shuffledCube.slice(0, totalCards);
    return cubeSubset;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function addToPile(pileIndex) {
    if (this.cube.length == 0) return;
    this.piles[pileIndex].push(this.cube.pop());
}

function initializePiles() {
    switch (this.draftType.toLowerCase()){
        case "winston":
            this.piles = [[],[],[]];
            addToPile(0);
            addToPile(1);
            addToPile(2);
            break;
    }
}

module.exports = Draft;