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
    if (this.started) return;
    this.started = true;
    this.randomizeDrafterOrder(this.drafters);
    this.initializeCube(this.cardsPerPlayer, this.drafters, this.cube);
    this.initializePiles(this.cube);
}

Draft.prototype.pickPile = function(pileIndex) {
    if (pileIndex > this.piles.length - 1) {
        return [ this.cube.pop() ];
    }
    var pile = this.piles[pileIndex].slice();
    this.piles[pileIndex] = [];
    this.nextTurn();
    return pile;
}

Draft.prototype.nextTurn = function () {
    this.currentTurn ++;
    if (this.currentTurn >= this.drafters) {
        this.currentTurn = 0;
    }
}

Draft.prototype.skipPile = function(pileIndex) {
    this.addToPile(pileIndex);
}

Draft.prototype.randomizeDrafterOrder = function() {
    this.drafterOrder = [];
    for (var i = 0; i < this.drafters; i++) {
        this.drafterOrder.push(i);
    }
    this.drafterOrder = shuffle(this.drafterOrder);
}

Draft.prototype.initializeCube = function() {
    var totalCards = this.cardsPerPlayer * this.drafters;
    this.cube = shuffle(this.cube);
    this.cube = this.cube.slice(0, totalCards);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

Draft.prototype.addToPile = function(pileIndex) {
    if (this.cube.length == 0) return;
    this.piles[pileIndex].push(this.cube.pop());
}

Draft.prototype.initializePiles = function() {
    switch (this.draftType.toLowerCase()){
        case "winston":
            this.piles = [[],[],[]];
            this.addToPile(0);
            this.addToPile(1);
            this.addToPile(2);
            break;
    }
}

Draft.prototype.getCurrentTurn = function() {
    return this.drafterOrder[this.currentTurn];
}

module.exports = Draft;