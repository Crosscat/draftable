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
    this.selection = cube;
}

Draft.prototype.start = function() {
    if (this.started) return;
    this.started = true;
    this.randomizeDrafterOrder(this.drafters);
    this.initializeCube(this.cardsPerPlayer, this.drafters, this.cube);
    this.initializePiles(this.cube);
}

Draft.prototype.pickPile = function(pileIndex) {
    var pile;
    if (pileIndex > this.piles.length - 1) {
        if (this.cube.length > 0){
            pile = [ this.cube.pop() ];
        }else{
            pile = [];
        }
    }else{
        pile = this.piles[pileIndex].slice();
        this.piles[pileIndex] = [];
        this.addToPile(pileIndex);
    }
    this.nextTurn();
    return pile;
}

Draft.prototype.peekPile = function (pileIndex) {
    if (pileIndex > this.piles.length - 1) {
        if (this.cube.length > 0){
            return [ this.cube[this.cube.length - 1] ];
        }else{
            return [];
        }
    }
    return this.piles[pileIndex];
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
    this.selection = this.cube.slice();
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
    if (!this.started){
        return -1;
    }
    return this.drafterOrder[this.currentTurn];
}

Draft.prototype.getPileSizes = function() {
    var pileSizes = [];
    for (var i = 0; i < this.piles.length; i++){
        pileSizes.push(this.piles[i].length);
    }
    pileSizes.push(this.cube.length);
    return pileSizes;
}

module.exports = Draft;