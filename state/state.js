var Draft = require('../state/draft');

var State = function() {
    this.drafts = [];
}

State.prototype.newDraft = function(draftType, cardsPerPlayer, cube) {
    var draftId = this.drafts.length;
    var draft = new Draft(draftId, draftType, cardsPerPlayer, cube);
    this.drafts.push(draft);
    return draftId;
}

State.prototype.getDraft = function(index) {
    return this.drafts[index];
}

module.exports = State;