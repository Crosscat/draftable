var Draft = function(draftId, draftType, cube) {
    this.draftId = draftId;
    this.draftType = draftType;
    this.cube = cube;
    this.drafters = 0;
    this.started = false;
    this.piles = [[]];
}

module.exports = Draft;