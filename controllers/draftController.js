var State = require('../state/state');

exports.createDraft = function(req, res) {
  var cubeJSON = req.body.cube;
  var cube = parseCubeJSON(cubeJSON);

  var draftType = req.body.draftType;
  var cardsPerPlayer = req.body.cardsPerPlayer;

  var draftID = global.state.newDraft(draftType, cardsPerPlayer, cube);

  res.send(global.state.drafts[draftID]);
};

var parseCubeJSON = function(cubeJSON) {
  var cube = [];
  for (var key in cubeJSON) {
    var card = cubeJSON[key];
    cube.push(card);
  }
  return cube;
}

exports.joinDraft = function (req, res) {
  var draftId = req.params.draftId;
  global.state.drafts[draftId].drafters++;
  
  res.send({ "ID" : (global.state.drafts[draftId].drafters - 1), "DraftType" : (global.state.drafts[draftId].draftType) });
};

exports.startDraft = function (req, res) {
  var draftId = req.params.draftId;
  global.state.drafts[draftId].start();

  res.send("Starting draft!"); //global.state.drafts[draftId]);
};

exports.checkPile = function (req, res) {
  var draftId = req.params.draftId;
  var pileId = req.params.pileId;

  res.send(global.state.drafts[draftId].piles[pileId]);
};

exports.takePile = function (req, res) {
  var draftId = req.params.draftId;
  var pileId = req.params.pileId;

  res.send(global.state.drafts[draftId].pickPile(pileId));
};

exports.skipPile = function (req, res) {
  var draftId = req.params.draftId;
  var pileId = req.params.pileId;

  global.state.drafts[draftId].skipPile(pileId);
};

exports.currentTurn = function (req, res) {
  var draftId = req.params.draftId;

  res.send(global.state.drafts[draftId].getCurrentTurn());
};